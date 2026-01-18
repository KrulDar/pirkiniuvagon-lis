import SettingsMenu from './SettingsMenu'

export default function Navbar({ lists, selectedListId, onSelectList, onManageLists, profile, role }) {
    return (
        <nav className="card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ fontSize: '1.5rem' }}>🛒</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1.2 }}>
                    Shopping<br />List
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SettingsMenu
                    profile={profile}
                    role={role}
                    lists={lists}
                    selectedListId={selectedListId}
                    onSelectList={onSelectList}
                    onManageLists={onManageLists}
                />
            </div>
        </nav>
    )
}
