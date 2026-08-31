import Link from 'next/link'
import React from 'react'

function Authnavbar() {
  return (
    <div className='flex gap-5'>
    <Link href="/authlayout/login">login</Link>
    <Link href="/authlayout/register">register</Link>
    </div>
  )
}

export default Authnavbar