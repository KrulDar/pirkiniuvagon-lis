import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'

export default function Auth() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [isResetPassword, setIsResetPassword] = useState(false)
    const [message, setMessage] = useState('')

    const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            if (isResetPassword) {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin + '/ShoppingListApp', // Optional: redirect back to app
                })
                if (error) throw error
                setMessage(t('auth.checkEmailReset'))
            } else if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error
                setMessage(t('auth.checkEmailConfirm'))
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                // Session update handled by onAuthStateChange in App
            }
        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container" style={{ display: 'grid', placeItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '2rem' }}>🛒</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                        Shopping List
                    </div>
                </div>

                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    {isResetPassword ? t('auth.resetPassword') : (isSignUp ? t('auth.createAccount') : t('auth.welcomeBack'))}
                </h1>

                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t('auth.email')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>

                    {!isResetPassword && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t('auth.password')}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ width: '100%' }}
                            />
                        </div>
                    )}

                    {message && (
                        <div style={{
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: (isSignUp || isResetPassword) && !message.includes('Error') ? 'hsl(140 30% 90%)' : 'hsl(0 30% 90%)',
                            color: (isSignUp || isResetPassword) && !message.includes('Error') ? 'hsl(140 100% 25%)' : 'hsl(0 100% 30%)',
                            fontSize: '0.9rem'
                        }}>
                            {message}
                        </div>
                    )}

                    <button type="submit" className="primary" disabled={loading}>
                        {loading ? t('auth.loading') : (isResetPassword ? t('auth.sendReset') : (isSignUp ? t('auth.signUp') : t('auth.logIn')))}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'hsl(var(--color-text-muted))', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {!isResetPassword && (
                        <div>
                            {isSignUp ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
                            {' '}
                            <button
                                type="button"
                                onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }}
                                style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'underline', boxShadow: 'none', color: 'var(--color-primary)' }}
                            >
                                {isSignUp ? t('auth.logIn') : t('auth.signUp')}
                            </button>
                        </div>
                    )}

                    {!isSignUp && !isResetPassword && (
                        <button
                            type="button"
                            onClick={() => { setIsResetPassword(true); setMessage(''); }}
                            style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.85rem', color: 'hsl(var(--color-text-muted))', textDecoration: 'underline', boxShadow: 'none' }}
                        >
                            {t('auth.forgotPassword')}
                        </button>
                    )}

                    {isResetPassword && (
                        <button
                            type="button"
                            onClick={() => { setIsResetPassword(false); setMessage(''); }}
                            style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'underline', boxShadow: 'none', color: 'var(--color-primary)' }}
                        >
                            {t('auth.backToLogin')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
