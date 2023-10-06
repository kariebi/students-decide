import React from 'react'
import { Link } from 'react-router-dom'


// import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const  isLoggedIn  = localStorage.getItem('isLoggedIn')
  // console.log(isLoggedIn)
  return (
    <div className='flex flex-col fixed w-full z-50'>
      <div className='h-20 w-full backdrop-blur-md  flex items-center flex-row'>
        <nav className='flex items-center justify-between w-full px-3'>
          <p className='text-4xl font-semibold text-primary'>SD</p>
          <Link
            to={isLoggedIn ?
              '/UserDashboard'
              :
              '/SignIn'}
            className='transition text-sm font-bold px-8 py-3 bg-primary text-white rounded-3xl hover:border-primary hover:bg-primaryblue'>
            {isLoggedIn ?
              'Dashboard'
              :
              'Login'}
          </Link>
        </nav>
      </div>
      <hr className='border border-primary' />
    </div>
  )
}

export default Navbar