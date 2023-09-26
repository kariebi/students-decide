import React from 'react'
import { Outlet } from 'react-router-dom'


const DashLayout = () => {
    return (
        <div className='flex-grow flex flex-col w-full min-h-screen'>
            <Outlet />
        </div>
    )
}

export default DashLayout