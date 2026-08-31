import Authnavbar from '@/components/Authnavbar'
import React from 'react'

function layout({children}) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div>
         <Authnavbar/>
          {children}
          </div>
          </body>
    </html>
  )
}

export default layout