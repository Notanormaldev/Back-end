import Protected from '@/components/Protected.js'
import React from 'react'

function page() {
  return (
    <>
    <div className='bg-gray-600 w-[200px]'></div>
         <Protected>
            hello
    </Protected></>
  )
}

export default page