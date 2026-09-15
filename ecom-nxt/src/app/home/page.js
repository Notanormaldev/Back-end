import Protected from '@/components/Protected.js'
import React from 'react'

function page() {
  return (
    <Protected>
        <div>home</div>
    </Protected>
  )
}

export default page