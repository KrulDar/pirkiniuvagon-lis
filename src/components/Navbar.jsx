import SettingsMenu from './SettingsMenu'
import { useTranslation } from 'react-i18next'

export default function Navbar({ lists, selectedListId, onSelectList, onManageLists, profile, role }) {
    const { t } = useTranslation()
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
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {t('nav.title')}
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
