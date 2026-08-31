import React from 'react'
import Link from 'next/link'
function Navbar() {
  return (
    <div className='flex gap-3'>
        <Link href="/mainlayout/home">home</Link>
        <Link href="/mainlayout/about">about</Link>
        <Link href="/mainlayout/contact">contact</Link>
        <Link href="/mainlayout/prodcuts">prodcuts</Link>
    </div>
  )
}

export default Navbar