import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAppData(session) {
    const [profile, setProfile] = useState(null)
    const [role, setRole] = useState('user')
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)

    const [refreshCount, setRefreshCount] = useState(0)

    const refresh = () => setRefreshCount(prev => prev + 1)

    useEffect(() => {
        if (!session) return

        async function fetchData() {
            setLoading(true)
            try {
                const user = session.user

                // 1. Fetch Profile with retry logic (to handle race condition with trigger)
                let profileData = null
                let profileError = null
                const maxRetries = 3
                const delays = [500, 1000, 2000]

                for (let i = 0; i <= maxRetries; i++) {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .maybeSingle() // Use maybeSingle to avoid errors on missing rows during retry

                    if (data) {
                        profileData = data
                        profileError = null
                        break
                    }

                    if (error && error.code !== 'PGRST116') { // PGRST116 is "Result contains 0 rows"
                        profileError = error
                        break
                    }

                    // If we're here, it means we have no data (race condition presumably)
                    // Wait before retrying, unless it's the last attempt
                    if (i < maxRetries) {
                        console.log(`⏳ Profile not found, retrying in ${delays[i]}ms... (Attempt ${i + 1}/${maxRetries})`)
                        await new Promise(resolve => setTimeout(resolve, delays[i]))
                    } else {
                        console.warn('⚠️ Max retries reached for fetching profile.')
                    }
                }

                if (!profileData && !profileError) {
                    // If after retries we still don't have data, it's effectively a fetch error for our purposes
                    console.error('❌ Profile could not be loaded after retries.')
                } else if (profileError) {
                    throw profileError
                }

                // 2. Fetch Role
                let { data: roleData } = await supabase
                    .from('user_roles')
                    .select('role')
                    .eq('user_id', user.id)
                    .maybeSingle()

                // 3. Fetch Lists
                let { data: listsData, error: listsError } = await supabase
                    .from('lists')
                    .select('*')
                    .order('created_at', { ascending: true })

                if (listsError) throw listsError

                setProfile(profileData)
                setRole(roleData?.role || 'user')
                setLists(listsData)

            } catch (error) {
                console.error('Error loading app data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [session, refreshCount])

    return { profile, role, lists, loading, refresh }
}
