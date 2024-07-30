import React from 'react'
import Header from '@/components/ui/Custom/Header'

const MainLayout = ({ children }) => {
    return (
        <div className='font-poppins'>
            <Header />
            {children}
        </div>
    )
}

export default MainLayout
