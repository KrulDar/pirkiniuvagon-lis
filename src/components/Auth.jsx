import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
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
                setMessage('Check your email for the password reset link!')
            } else if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error
                setMessage('Check your email for the confirmation link!')
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
                    {isResetPassword ? 'Reset Password' : (isSignUp ? 'Create Account' : 'Welcome Back')}
                </h1>

                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
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
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
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
                        {loading ? 'Loading...' : (isResetPassword ? 'Send Reset Link' : (isSignUp ? 'Sign Up' : 'Log In'))}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'hsl(var(--color-text-muted))', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {!isResetPassword && (
                        <div>
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            {' '}
                            <button
                                type="button"
                                onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }}
                                style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'underline', boxShadow: 'none', color: 'var(--color-primary)' }}
                            >
                                {isSignUp ? 'Log In' : 'Sign Up'}
                            </button>
                        </div>
                    )}

                    {!isSignUp && !isResetPassword && (
                        <button
                            type="button"
                            onClick={() => { setIsResetPassword(true); setMessage(''); }}
                            style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.85rem', color: 'hsl(var(--color-text-muted))', textDecoration: 'underline', boxShadow: 'none' }}
                        >
                            Forgot Password?
                        </button>
                    )}

                    {isResetPassword && (
                        <button
                            type="button"
                            onClick={() => { setIsResetPassword(false); setMessage(''); }}
                            style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'underline', boxShadow: 'none', color: 'var(--color-primary)' }}
                        >
                            Back to Log In
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
