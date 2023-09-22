import React from 'react'
import { Outlet } from 'react-router-dom'

import DashNavbar from '../components/DashNavbar'
import DashFooter from '../components/DashFooter'

const DashLayout = () => {
    return (
        <div>
            <DashNavbar />
            <Outlet />
            <DashFooter />
        </div>
    )
}

export default DashLayout