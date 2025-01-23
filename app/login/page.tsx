'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, googleProvider } from '../../firebaseConfig' // Adjust to your Firebase config path

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.error('Passwords do not match')
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden font-sans">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#F86422]/10 blur-3xl animate-pulse -top-32 -left-32" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#F86422]/20 blur-3xl animate-float1 -bottom-32 -right-32" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#F86422]/15 blur-3xl animate-float2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push('/')}
          className="py-2 px-4 rounded bg-[#F86422] hover:bg-[#F86422]/90 transition-colors text-white font-bold"
        >
          Back
        </button>
      </div>

      <div className="relative z-10 p-6 w-full max-w-md bg-neutral-900 rounded-xl transition-transform duration-300">
        <h1 className="text-3xl font-bold text-center mb-6">{isCreatingAccount ? 'Create Account' : 'Login'}</h1>
        <form onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin} className="space-y-4 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-neutral-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-neutral-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isCreatingAccount && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 rounded bg-neutral-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <button
            type="submit"
            className="w-full py-2 rounded bg-[#F86422] hover:bg-[#F86422]/90 transition-colors font-bold"
          >
            {isCreatingAccount ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        {!isCreatingAccount && (
          <div className="flex justify-between mt-4 gap-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-1/2 py-3 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              Sign in with Google
            </button>
            <button
              className="w-1/2 py-3 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              Sign in with Twitter
            </button>
          </div>
        )}
      </div>
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 py-2 px-4 rounded-full cursor-pointer transition-transform font-bold demo-button ${
          isCreatingAccount ? 'bg-[#F86422] text-white' : 'bg-white text-black'
        }`}
        onClick={() => setIsCreatingAccount(!isCreatingAccount)}
      >
        {isCreatingAccount ? 'Back to Login' : 'Create Account'}
      </div>

      <style jsx>{`
        @keyframes float1 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(20px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes float2 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-20px); }
          100% { transform: translateY(0) translateX(0); }
        }
        .animate-float1 {
          animation: float1 6s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 8s ease-in-out infinite;
        }
        .demo-button {
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .demo-button:hover {
          box-shadow: 0 0 30px rgba(248, 100, 34, 0.2);
        }
      `}</style>
    </div>
  )
}