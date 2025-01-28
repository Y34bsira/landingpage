'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../../firebaseConfig'; // Adjust to your Firebase config path
import Button from '../components/Button'; // Ensure this path is correct
import Link from 'next/link';
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState(''); // Added error state
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous error
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      setError('You have entered the wrong email and password combination.');
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous error
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      setError('Failed to create account. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F86422] via-transparent to-[#F86422] animate-gradient"></div>
      
      <div className="relative z-10 w-full max-w-md p-8 bg-neutral-900 bg-opacity-90 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="text-white text-sm mr-auto back-button"
          >
            Back
          </button>
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">{isCreatingAccount ? 'Create Account' : 'Login to Your Account'}</h2>
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-neutral-800 text-white" // Changed bg-neutral-900 to bg-neutral-800
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-neutral-800 text-white" // Changed bg-neutral-900 to bg-neutral-800
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isCreatingAccount && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 rounded bg-neutral-800 text-white" // Changed bg-neutral-900 to bg-neutral-800
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <Button className="w-full py-3 submit-button">
            {isCreatingAccount ? 'Create Account' : 'Sign In'}
          </Button>
        </form>
        {!isCreatingAccount && (
          <div className="flex justify-between mt-4 gap-4">
            <Button
              onClick={handleGoogleSignIn}
              className="w-1/2 py-3 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              Sign in with Google
            </Button>
            <Button
              className="w-1/2 py-3 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              Sign in with Twitter
            </Button>
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
        .bg-red-500 {
          background-color: #f56565;
        }
        .text-white {
          color: #ffffff;
        }
        .p-2 {
          padding: 0.5rem;
        }
        .rounded {
          border-radius: 0.25rem;
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  )
}