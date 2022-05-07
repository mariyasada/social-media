import React from 'react'
import { AuthProvider } from './auth-context'

export const CombineProvider = ({children}) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}


