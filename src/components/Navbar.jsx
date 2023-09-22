import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-20 w-full bg-primary/70 backdrop-blur-md fixed flex items-center flex-row'>
      <nav className='flex items-center justify-between w-full px-3'>
      <p>Logo</p>
       <Link 
       to='/SignIn'
       className='transition duration-[1s] border-transparent font-bold px-8 py-3 bg-black text-primary rounded-3xl hover:border hover:border-black hover:bg-primary hover:text-black'>Log-In</Link>
      </nav>
    </div>
  )
}

export default Navbar