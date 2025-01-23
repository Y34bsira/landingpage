'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '../../firebaseConfig'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login')
      }
    })
    return () => unsubscribe()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
    </div>
  )
}
