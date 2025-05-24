'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, LogOut } from 'lucide-react'

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Button variant="ghost" size="icon" disabled>
        <User className="h-5 w-5" />
      </Button>
    )
  }

  if (session) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium hidden md:inline">
          {session.user?.name || session.user?.email}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => signOut({ callbackUrl: '/' })}
          title="Sign out"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Link href="/login">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
      <Link href="/register">
        <Button size="sm">
          Sign Up
        </Button>
      </Link>
    </div>
  )
} 