import React from 'react'
import { AuthProvider,PostProvider } from './index'

export const CombineProvider = ({children}) => {
  return (
    <AuthProvider>
      <PostProvider>
        {children}
      </PostProvider>
    </AuthProvider>
  )
}


