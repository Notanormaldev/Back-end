"use client"

import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './toggletheme'
import { useAuth } from '@/context/aurhcontext'
import { Button } from '@/components/ui/button'
import { LogOut, User as UserIcon } from 'lucide-react'

function Nav() {
  const { user, logout } = useAuth() || {}

  return (
    <div className='flex items-center justify-between px-10 py-6 border-b border-border/40 mb-6'>
      <div className='flex items-center gap-8'>
        <Link href="/" className='text-xl font-bold text-foreground hover:opacity-90'>
          Ecom-nxt
        </Link>
        <ul className='flex gap-6 text-sm font-medium text-muted-foreground'>
          <Link href="/home" className='hover:text-foreground transition-colors'>Home</Link>
          <Link href="/product" className='hover:text-foreground transition-colors'>Products</Link>
        </ul>
      </div>

      <div className='flex items-center gap-4'>
        {user ? (
          <div className='flex items-center gap-3'>
            <span className='flex items-center gap-1.5 text-sm font-medium text-foreground'>
              <UserIcon className='h-4 w-4 text-muted-foreground' />
              {user.name || user.email || 'User'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className='gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive'
            >
              <LogOut className='h-3.5 w-3.5' />
              Logout
            </Button>
          </div>
        ) : (
          <div className='flex items-center gap-3 text-sm'>
            <Link href="/login" className='text-muted-foreground hover:text-foreground'>
              Login
            </Link>
            <Link href="/register" className='font-medium text-primary hover:underline'>
              Register
            </Link>
          </div>
        )}

        <ModeToggle />
      </div>
    </div>
  )
}

export default Nav