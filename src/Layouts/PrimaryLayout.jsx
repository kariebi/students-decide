import React from 'react'
import { Outlet } from 'react-router-dom'


const PrimaryLayout = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <Outlet />
    </div>
  )
}

export default PrimaryLayout