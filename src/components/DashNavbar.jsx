import React from 'react';
// import useAuth from '../hooks/useAuth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClock } from "@fortawesome/free-solid-svg-icons"

import LogoutButton from './LogoutButton';



const DashNavbar = () => {

  const registrationNumber = localStorage.getItem('registrationNumber')

  return (
    <div className='w-screen z-20 flex flex-col items-center'>
      <div className='justify-center items-center flex flex-col fixed w-full sm:bg-primary bg-transparent'>
        <div className='container pb-4 bg-primary rounded-b-2xl'>
          <div className='h-20 w-full  flex items-center flex-row'>
            <nav className='flex items-center justify-start w-full px-3'>
              <div className='w-[2.75rem] h-[2.75rem]  flex justify-center items-center rounded-full bg-black/90'>
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  style={{ color: "#007f00" }} />
              </div>
              <div className='pl-2 text-white'>
                <h1>Hello <b className='text-bold'>{registrationNumber}</b> </h1>
                <h2>FUTO</h2>
              </div>
              <div className='ml-auto p-2'>
                <LogoutButton />
              </div>
            </nav>
          </div>
          {/* Voting Timer Component */}
          <div className='w-full bg-primary'>
            <section className='rounded bg-red-800 text-white flex py-1 m-5 mt-0 items-center'>
              <aside className='px-2'>
                <FontAwesomeIcon
                  icon={faClock}
                  size="lg" />
              </aside>
              <div>
                <h1 className='text-sm'>Voting Close:</h1>
                <h2 className='text-sm'>'Time Left'</h2>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashNavbar