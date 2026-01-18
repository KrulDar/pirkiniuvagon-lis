import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function SettingsMenu({ profile, role, lists, selectedListId, onSelectList, onManageLists }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    // Theme state
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'system'
        }
        return 'system'
    })

    // Apply theme
    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark')
        } else if (theme === 'light') {
            root.setAttribute('data-theme', 'light')
        } else {
            root.removeAttribute('data-theme')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

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

    const updateLanguage = async (lang) => {
        const { error } = await supabase
            .from('profiles')
            .update({ language: lang })
            .eq('id', profile.id)

        if (error) console.error('Error updating language:', error)
    }

    return (
        <div className="settings-menu" style={{ position: 'relative' }} ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* iOS Style Gear Icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </button>

            {isOpen && (
                <div className="card" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    minWidth: '260px',
                    padding: '1.25rem',
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    {/* User Info */}
                    <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ fontWeight: 600, marginBottom: '0.25rem', wordBreak: 'break-all' }}>{profile?.email}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Role: {role}</div>
                    </div>

                    {/* Language Selector */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>LANGUAGE</label>
                        <select
                            value={profile?.language || 'lt'}
                            onChange={(e) => updateLanguage(e.target.value)}
                            style={{ width: '100%' }}
                        >
                            <option value="lt">Lietuvių</option>
                            <option value="en">English</option>
                            <option value="no">Norsk</option>
                        </select>
                    </div>

                    {/* List Selector (Moved from header) */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>ACTIVE LIST</label>
                        <select
                            value={selectedListId || ''}
                            onChange={(e) => {
                                if (e.target.value === '__MANAGE__') {
                                    onManageLists && onManageLists()
                                    setIsOpen(false)
                                } else {
                                    onSelectList(e.target.value)
                                }
                            }}
                            style={{ width: '100%' }}
                        >
                            <option value="" disabled>Select List</option>
                            {lists?.map(list => (
                                <option key={list.id} value={list.id}>{list.name}</option>
                            ))}
                            <option disabled>──────────</option>
                            <option value="__MANAGE__">⚙ Manage Lists</option>
                        </select>
                    </div>

                    {/* Theme Toggle */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>APPEARANCE</label>
                        <div style={{ display: 'flex', background: 'var(--color-bg-body)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                            <button
                                onClick={() => setTheme('light')}
                                style={{ flex: 1, padding: '0.4rem', fontSize: '1.2rem', background: theme === 'light' ? 'var(--color-bg-card)' : 'transparent', border: 'none', boxShadow: theme === 'light' ? 'var(--shadow-sm)' : 'none' }}
                                title="Light Mode"
                            >
                                ☀️
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                style={{ flex: 1, padding: '0.4rem', fontSize: '1.2rem', background: theme === 'dark' ? 'var(--color-bg-card)' : 'transparent', border: 'none', boxShadow: theme === 'dark' ? 'var(--shadow-sm)' : 'none' }}
                                title="Dark Mode"
                            >
                                🌙
                            </button>
                            <button
                                onClick={() => setTheme('system')}
                                style={{ flex: 1, padding: '0.4rem', fontSize: '1rem', background: theme === 'system' ? 'var(--color-bg-card)' : 'transparent', border: 'none', boxShadow: theme === 'system' ? 'var(--shadow-sm)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                title="System Default"
                            >
                                Auto
                            </button>
                        </div>
                    </div>

                    {role === 'admin' && (
                        <button style={{ width: '100%', textAlign: 'left' }}>Admin Panel</button>
                    )}

                    <button
                        onClick={() => supabase.auth.signOut()}
                        style={{ width: '100%', textAlign: 'left', color: 'hsl(0, 80%, 60%)', marginTop: '0.5rem', border: '1px solid hsl(0, 80%, 90%)', background: 'hsl(0, 80%, 98%)' }}
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    )
}
