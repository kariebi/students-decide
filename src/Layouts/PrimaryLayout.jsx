import React from 'react'
import { Outlet } from 'react-router-dom'


const PrimaryLayout = () => {
  return (
    <div className='bg-faintgreen/40 w-full min-h-screen flex justify-center items-center'>
      <Outlet />
    </div>
  )
}

export default PrimaryLayout