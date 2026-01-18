import { useState, useMemo, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useListItems } from '../hooks/useListItems'
import CategoryManager from './CategoryManager'

export default function ShoppingList({ listId }) {
    const { categories, items, loading, updateLocalItem } = useListItems(listId)

    // Local state for UI
    const [searchQuery, setSearchQuery] = useState('')
    const [showCheckedOnly, setShowCheckedOnly] = useState(false)
    const [showCatManager, setShowCatManager] = useState(false)

    // Collapsed categories state (persisted in localStorage)
    const [collapsedCategories, setCollapsedCategories] = useState(() => {
        const saved = localStorage.getItem('collapsedCategories')
        return saved ? new Set(JSON.parse(saved)) : new Set()
    })

    // Save collapsed state to localStorage
    useEffect(() => {
        localStorage.setItem('collapsedCategories', JSON.stringify([...collapsedCategories]))
    }, [collapsedCategories])

    // Toggle category collapse
    const toggleCategory = (categoryId) => {
        setCollapsedCategories(prev => {
            const newSet = new Set(prev)
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId)
            } else {
                newSet.add(categoryId)
            }
            return newSet
        })
    }

    // Add Item State
    const [isAdding, setIsAdding] = useState(false)
    const [newItemName, setNewItemName] = useState('')
    const [newItemAmount, setNewItemAmount] = useState(1)
    const [newItemCategory, setNewItemCategory] = useState('')
    const [newItemComment, setNewItemComment] = useState('')

    // Actions
    const toggleCheck = async (item) => {
        // Optimistic Update
        updateLocalItem(item.id, { checked: !item.checked })

        // Server Update
        const { error } = await supabase
            .from('items')
            .update({ checked: !item.checked })
            .eq('id', item.id)

        if (error) {
            console.error('Error toggling item:', error)
            // Revert on error
            updateLocalItem(item.id, { checked: item.checked })
        }
    }

    const updateItem = async (itemId, updates) => {
        // Optimistic Update
        updateLocalItem(itemId, updates)

        const { error } = await supabase
            .from('items')
            .update(updates)
            .eq('id', itemId)

        if (error) {
            console.error('Error updating item:', error)
            alert('Failed to update item')
        }
    }

    const addItem = async (e) => {
        e.preventDefault()
        if (!newItemName.trim()) return
        if (!listId) {
            alert('No list selected!')
            return
        }

        const { error } = await supabase
            .from('items')
            .insert({
                list_id: listId,
                name: newItemName,
                amount: newItemAmount,
                category_id: newItemCategory || null,
                comment: newItemComment || null,
                checked: false
            })

        if (error) {
            console.error('Error adding item:', error)
            alert('Error adding item: ' + error.message)
        } else {
            setNewItemName('')
            setNewItemAmount(1)
            setNewItemComment('')
            setIsAdding(false)
        }
    }

    const deleteItem = async (itemId) => {
        if (!confirm("Delete this item?")) return;
        const { error } = await supabase.from('items').delete().eq('id', itemId);
        if (error) console.error("Error deleting item:", error);
    }

    // Filtering
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            if (showCheckedOnly && !item.checked) return false
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                const matchName = item.name.toLowerCase().includes(q)
                const matchComment = item.comment?.toLowerCase().includes(q)
                return matchName || matchComment
            }
            return true
        })
    }, [items, showCheckedOnly, searchQuery])

    // Grouping
    const itemsByCat = {}
    const uncategorized = []

    filteredItems.forEach(item => {
        if (item.category_id) {
            if (!itemsByCat[item.category_id]) itemsByCat[item.category_id] = []
            itemsByCat[item.category_id].push(item)
        } else {
            uncategorized.push(item)
        }
    })

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading list...</div>

    return (
        <div className="shopping-list">
            {/* Controls */}
            <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>

                    {/* Filter Button */}
                    {/* Filter Button */}
                    <button
                        onClick={() => setShowCheckedOnly(!showCheckedOnly)}
                        style={{
                            minWidth: showCheckedOnly ? 'auto' : '44px',
                            minHeight: '44px',
                            padding: showCheckedOnly ? '0 1rem' : 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            backgroundColor: showCheckedOnly ? 'hsl(var(--color-primary))' : 'var(--color-bg-card)',
                            color: showCheckedOnly ? 'white' : 'var(--color-text-main)',
                            border: '1px solid var(--color-border)',
                            fontSize: '1.2rem',
                            flexShrink: 0
                        }}
                        title={showCheckedOnly ? "Show All items" : "Show only Checked items"}
                    >
                        {/* Filter Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>

                        {/* Selected Items Label (Only shows when active to save space? Or always? User asked to put it near. Let's show it always if space permits, or better yet, make the button expand when active) */}
                        <span style={{ fontSize: '0.9rem', fontWeight: 500, display: showCheckedOnly ? 'inline' : 'none' }}>Selected items</span>
                    </button>

                    {/* Search Bar */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                minHeight: '44px',
                                paddingLeft: '2.5rem'
                            }}
                        />
                        <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                    </div>

                    {/* Plus / Menu Button */}
                    <PlusMenu
                        isAdding={isAdding}
                        setIsAdding={setIsAdding}
                        showCatManager={showCatManager}
                        setShowCatManager={setShowCatManager}
                    />
                </div>

                {/* Category Manager */}
                {showCatManager && !isAdding && (
                    <div style={{ marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem' }}>Manage Categories</h3>
                            <button onClick={() => setShowCatManager(false)} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem' }}>Close</button>
                        </div>
                        <CategoryManager categories={categories} onClose={() => { }} />
                    </div>
                )}

                {/* Add Item Form */}
                {isAdding && (
                    <form onSubmit={addItem} style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div style={{ flex: 2, minWidth: '150px' }}>
                            <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Item Name</label>
                            <input
                                autoFocus
                                type="text"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                placeholder="e.g. Milk"
                                required
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{ width: '80px' }}>
                            <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Qty</label>
                            <input
                                type="number"
                                min="1"
                                value={newItemAmount}
                                onChange={(e) => setNewItemAmount(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{ flex: 1, minWidth: '120px' }}>
                            <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Category</label>
                            <select
                                value={newItemCategory}
                                onChange={(e) => setNewItemCategory(e.target.value)}
                                style={{ width: '100%' }}
                            >
                                <option value="">Uncategorized</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ flex: 2, minWidth: '150px' }}>
                            <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Comment</label>
                            <input
                                type="text"
                                value={newItemComment}
                                onChange={(e) => setNewItemComment(e.target.value)}
                                placeholder="Optional note"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <button type="submit" className="primary" style={{ height: '38px', minWidth: '80px' }}>Add</button>
                    </form>
                )}
            </div>

            {categories.map(cat => {
                const catItems = itemsByCat[cat.id] || []
                if (catItems.length === 0) return null

                const isCollapsed = collapsedCategories.has(cat.id)
                const itemCount = catItems.length

                return (
                    <div key={cat.id} className="category-group" style={{ marginBottom: '1.5rem' }}>
                        <h3
                            onClick={() => toggleCategory(cat.id)}
                            style={{
                                fontSize: '1.1rem',
                                color: 'var(--color-primary)',
                                borderBottom: '2px solid var(--color-border)',
                                paddingBottom: '0.25rem',
                                marginBottom: '0.5rem',
                                cursor: 'pointer',
                                userSelect: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                {isCollapsed ? '▶' : '▼'}
                            </span>
                            {cat.name}
                            {isCollapsed && (
                                <span style={{ fontSize: '0.85rem', opacity: 0.6, fontWeight: 'normal' }}>
                                    ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                                </span>
                            )}
                        </h3>
                        {!isCollapsed && (
                            <div className="items-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {catItems.map(item => (
                                    <ItemRow
                                        key={item.id}
                                        item={item}
                                        categories={categories}
                                        onToggle={() => toggleCheck(item)}
                                        onUpdate={updateItem}
                                        onDelete={() => deleteItem(item.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}

            {uncategorized.length > 0 && (
                <div className="category-group" style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Uncategorized</h3>
                    <div className="items-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {uncategorized.map(item => (
                            <ItemRow
                                key={item.id}
                                item={item}
                                categories={categories}
                                onToggle={() => toggleCheck(item)}
                                onUpdate={updateItem}
                                onDelete={() => deleteItem(item.id)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {items.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                    <p>This list is empty.</p>
                    <button style={{ marginTop: '1rem' }} onClick={() => setIsAdding(true)}>Add your first item</button>
                </div>
            )}

            {items.length > 0 && filteredItems.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                    <p>No items match your filters.</p>
                </div>
            )}
        </div>
    )
}

function PlusMenu({ isAdding, setIsAdding, showCatManager, setShowCatManager }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [menuRef])

    return (
        <div style={{ position: 'relative' }} ref={menuRef}>
            <button
                className="primary"
                onClick={() => {
                    if (isAdding) {
                        setIsAdding(false)
                    } else {
                        setIsOpen(!isOpen)
                    }
                }}
                style={{
                    minWidth: '44px',
                    minHeight: '44px',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    lineHeight: 1
                }}
                title={isAdding ? "Cancel" : "Add or Manage"}
            >
                {isAdding ? '✕' : '+'}
            </button>

            {isOpen && !isAdding && (
                <div className="card" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    minWidth: '180px',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <button
                        onClick={() => {
                            setIsAdding(true)
                            setIsOpen(false)
                            if (showCatManager) setShowCatManager(false)
                        }}
                        style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>➕</span> Add Item
                    </button>
                    <button
                        onClick={() => {
                            setShowCatManager(!showCatManager)
                            setIsOpen(false)
                        }}
                        style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>📂</span> {showCatManager ? 'Hide Categories' : 'Manage Categories'}
                    </button>
                </div>
            )}
        </div>
    )
}

function ItemRow({ item, categories, onToggle, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [edited, setEdited] = useState({
        name: item.name,
        amount: item.amount,
        comment: item.comment || '',
        category_id: item.category_id || ''
    })

    const startEditing = () => {
        setEdited({
            name: item.name,
            amount: item.amount,
            comment: item.comment || '',
            category_id: item.category_id || ''
        })
        setIsEditing(true)
    }

    const save = () => {
        if (!edited.name.trim()) return
        onUpdate(item.id, {
            name: edited.name,
            amount: edited.amount,
            comment: edited.comment || null,
            category_id: edited.category_id || null
        })
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <div className="item-row card" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid var(--color-primary)' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ flex: 2 }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Name</label>
                        <input
                            value={edited.name}
                            onChange={e => setEdited({ ...edited, name: e.target.value })}
                            style={{ width: '100%' }}
                            autoFocus
                        />
                    </div>
                    <div style={{ width: '80px' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Qty</label>
                        <input
                            type="number" min="1"
                            value={edited.amount}
                            onChange={e => setEdited({ ...edited, amount: parseInt(e.target.value) || 1 })}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Category</label>
                        <select
                            value={edited.category_id}
                            onChange={e => setEdited({ ...edited, category_id: e.target.value })}
                            style={{ width: '100%' }}
                        >
                            <option value="">Uncategorized</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Comment</label>
                    <input
                        value={edited.comment}
                        onChange={e => setEdited({ ...edited, comment: e.target.value })}
                        placeholder="Optional note"
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button className="primary" onClick={save} style={{ flex: 1 }}>Save</button>
                    <button onClick={() => setIsEditing(false)} style={{ flex: 1 }}>Cancel</button>
                    <button
                        onClick={() => {
                            setIsEditing(false)
                            onDelete()
                        }}
                        style={{ flex: 1, backgroundColor: 'hsl(0, 70%, 50%)', color: 'white' }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        )
    }

    const incrementAmount = () => {
        onUpdate(item.id, { amount: item.amount + 1 })
    }

    const decrementAmount = () => {
        if (item.amount > 1) {
            onUpdate(item.id, { amount: item.amount - 1 })
        }
    }

    return (
        <div
            className="item-row card"
            style={{
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: item.checked ? 'hsl(var(--color-bg-selected))' : 'var(--color-bg-card)',
                transition: 'background-color 0.2s',
            }}
        >
            <input
                type="checkbox"
                checked={item.checked}
                onChange={onToggle}
                style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
            />

            <div style={{ flex: 1 }}> {/* Removed opacity change */}
                <div style={{ fontWeight: 500 }}>
                    {item.name}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                    onClick={decrementAmount}
                    disabled={item.amount <= 1}
                    style={{
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.9rem',
                        cursor: item.amount <= 1 ? 'not-allowed' : 'pointer',
                        opacity: item.amount <= 1 ? 0.3 : 1,
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg-card)',
                        borderRadius: 'var(--radius-sm)',
                        minWidth: '28px'
                    }}
                    title="Decrease quantity"
                >
                    −
                </button>
                <div style={{
                    fontWeight: 600,
                    color: 'var(--color-text-main)',
                    fontSize: '0.9rem',
                    minWidth: '25px',
                    textAlign: 'center'
                }}>
                    {item.amount}
                </div>
                <button
                    onClick={incrementAmount}
                    style={{
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg-card)',
                        borderRadius: 'var(--radius-sm)',
                        minWidth: '28px'
                    }}
                    title="Increase quantity"
                >
                    +
                </button>
            </div>

            {item.comment && (
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowComment(!showComment)}
                        style={{
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            padding: '0.2rem 0.5rem',
                            backgroundColor: 'hsl(var(--color-primary) / 0.1)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--color-primary)',
                            fontWeight: 600,
                            border: 'none'
                        }}
                        title="View comment"
                    >
                        💬
                    </button>
                    {showComment && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '100%',
                                right: 0,
                                marginBottom: '0.5rem',
                                backgroundColor: 'hsl(var(--color-primary) / 0.95)',
                                border: '2px solid var(--color-primary)',
                                borderRadius: 'var(--radius-md)',
                                padding: '0.75rem 1rem',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                minWidth: '200px',
                                maxWidth: '300px',
                                zIndex: 10,
                                fontSize: '0.95rem',
                                color: 'white',
                                fontWeight: '500',
                                lineHeight: '1.4'
                            }}
                        >
                            {item.comment}
                            <button
                                onClick={() => setShowComment(false)}
                                style={{
                                    position: 'absolute',
                                    top: '0.25rem',
                                    right: '0.25rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>
            )}

            <button
                onClick={startEditing}
                style={{
                    padding: '0.3rem 0.6rem',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-card)',
                    borderRadius: 'var(--radius-sm)'
                }}
                title="Edit item"
            >
                ✏️
            </button>

        </div>
    )
}
