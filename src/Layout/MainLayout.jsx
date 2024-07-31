import React from 'react'
import Header from '@/components/ui/Custom/Header'
import { Toaster } from '@/components/ui/sonner'

const MainLayout = ({ children }) => {
    return (
        <div className='font-poppins'>
            <Toaster />
            <Header />
            {children}
        </div>
    )
}

export default MainLayout
