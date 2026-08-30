import React from 'react'
import Link from 'next/link'
function Navbar() {
  return (
    <div className='flex gap-3'>
        <Link href="/home">home</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link>
    </div>
  )
}

export default Navbar