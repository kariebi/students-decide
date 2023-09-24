import React from 'react'
import { Outlet } from 'react-router-dom'

import DashNavbar from '../components/DashNavbar'
import DashFooter from '../components/DashFooter'

const DashLayout = () => {
    return (
        <div className='flex-grow flex flex-col w-full min-h-screen'>
            <DashNavbar />
            <Outlet />
            <DashFooter />
        </div>
    )
}

export default DashLayout