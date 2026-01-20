import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { DEFAULT_CATEGORIES, DEFAULT_LIST_NAME, DEFAULT_ITEMS } from '../lib/defaultItems';

/**
 * Hook to handle first-time user setup
 * Creates a default "Food" list with pre-populated items based on user's signup language
 */
export function useFirstTimeSetup(profile, onComplete) {
    const isSetupInProgress = useRef(false);

    useEffect(() => {
        if (!profile) return;

        const setupDefaultList = async () => {
            try {
                // Check if user has already been set up or setup is in progress
                // Also check sessionStorage to prevent loop within same session if DB update fails
                if (profile.initial_setup_completed || isSetupInProgress.current) {
                    return;
                }

                // Also check if user already has any lists (safety check)
                const { data: existingLists } = await supabase
                    .from('lists')
                    .select('id')
                    .limit(1);

                if (existingLists && existingLists.length > 0) {
                    console.log('💡 User already has lists, skipping auto-setup');
                    // Mark as completed even if we didn't do it, to stop checking
                    await supabase.from('profiles').update({ initial_setup_completed: true }).eq('id', profile.id);
                    return;
                }

                isSetupInProgress.current = true;

                console.log('🎁 First time user detected, creating default list...');

                // Get the signup language from user metadata or profile
                const { data: userData } = await supabase.auth.getUser();
                const user = userData?.user;
                const signupLanguage = user?.user_metadata?.signup_language || profile.language || 'en';

                console.log(`📝 Using language: ${signupLanguage}`);

                // Create the "Food" list
                const listName = DEFAULT_LIST_NAME[signupLanguage] || DEFAULT_LIST_NAME.en;
                const { data: newList, error: listError } = await supabase
                    .from('lists')
                    .insert({
                        name: listName,
                        owner_id: profile.id
                    })
                    .select()
                    .single();

                if (listError) {
                    console.error('Error creating default list:', listError.message);
                    isSetupInProgress.current = false;
                    return;
                }

                console.log(`✅ Created list: ${listName} (${newList.id})`);

                // Create categories
                const categories = DEFAULT_CATEGORIES[signupLanguage] || DEFAULT_CATEGORIES.en;
                const categoryMap = {};

                for (let i = 0; i < categories.length; i++) {
                    const { data: category, error: catError } = await supabase
                        .from('categories')
                        .insert({
                            name: categories[i],
                            owner_id: profile.id,
                            sort_order: i
                        })
                        .select()
                        .single();

                    if (!catError && category) {
                        categoryMap[i] = category.id;
                    } else if (catError) {
                        console.error(`Error creating category ${categories[i]}:`, catError.message);
                    }
                }

                const categoryCount = Object.keys(categoryMap).length;
                console.log(`✅ Created ${categoryCount} / ${categories.length} categories`);

                // Create items
                const itemsToInsert = DEFAULT_ITEMS.map((item, index) => {
                    const itemName = item[`name_${signupLanguage}`] || item.name_en;
                    const categoryId = categoryMap[item.category];

                    return {
                        list_id: newList.id,
                        name: itemName,
                        amount: item.amount,
                        category_id: categoryId || null,
                        checked: false,
                        sort_order: index
                    };
                });

                console.log(`🚀 Inserting ${itemsToInsert.length} items...`);
                // Insert in chunks of 50 to avoid potential 400 errors with large inserts
                for (let i = 0; i < itemsToInsert.length; i += 50) {
                    const chunk = itemsToInsert.slice(i, i + 50);
                    const { error: itemsError } = await supabase
                        .from('items')
                        .insert(chunk);

                    if (itemsError) {
                        console.error(`Error creating items chunk ${i / 50 + 1}:`, itemsError.message);
                        // If items fail, we still have the list and categories, 
                        // but we shouldn't mark as complete if we want to retry items.
                        // However, retrying the whole setup would create duplicate lists.
                        // For now, we continue and mark as done to avoid broken state.
                    }
                }

                console.log(`✅ Default setup operations finished`);

                // Mark setup as completed
                const { error: updateError } = await supabase
                    .from('profiles')
                    .update({ initial_setup_completed: true })
                    .eq('id', profile.id);

                if (updateError) {
                    console.error('Error updating profile:', updateError.message);
                } else {
                    console.log('🎉 First-time setup completed successfully!');
                    if (onComplete) onComplete();
                }

            } catch (error) {
                console.error('Error in first-time setup:', error);
                isSetupInProgress.current = false;
            }
        };

        setupDefaultList();
    }, [profile, onComplete]);
}
