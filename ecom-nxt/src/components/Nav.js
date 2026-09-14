import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './toggletheme'

function Nav() {
  return (
    <div className='flex gap-100 px-20 py-10 '>
        <h1>Ecom-nxt</h1>
        <ul className='flex gap-20'>
            <Link href="/home">Home</Link>
            <Link href="/product">Products</Link>
 
        </ul>
        <ModeToggle/>
    </div>
  )
}

export default Nav