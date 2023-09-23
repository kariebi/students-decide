import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-col fixed w-full'>
      <div className='h-20 w-full backdrop-blur-md  flex items-center flex-row'>
        <nav className='flex items-center justify-between w-full px-3'>
          <p>Logo</p>
          <Link
            to='/SignIn'
            className='transition border-primary font-bold px-8 py-3 bg-black text-primary rounded-3xl border hover:border-primary hover:bg-black/60 hover:text-primary'>Login</Link>
        </nav>
      </div>
      <hr className='border border-primary'/>
    </div>
  )
}

export default Navbar