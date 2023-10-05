import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/home/Footer'

const DashLayout = () => {
    return (
        <div className='flex-grow flex justify-center items-center flex-col w-full min-h-screen'>
            <Outlet />
            <Footer/>
        </div>
    )
}

export default DashLayout