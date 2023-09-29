import React from 'react'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

const Vote = () => {
  const electionstarted = false
  return (
    <div className='flex-grow w-full h-full flex flex-col'>
      <section className='w-full fixed text-center py-3 bg-primary/10 backdrop-blur-sm font-semibold'>
        <header
          className='flex w-full px-2 justify-center items-center'>
          <Link
            to='/userdashboard'
            className='absolute left-2'>
            <FontAwesomeIcon
              icon={faLessThan}
              size="lg"
              style={{ color: "#000000" }} />
          </Link>
          <p>Vote</p>
        </header>
      </section>
      {/* Body */}
      <section
      className='pt-12 flex w-full min-h-screen'>
        {
          electionstarted ?
            <div>
              The normal voting component
            </div> :
            <div
              className='w-full flex flex-col justify-center items-center text-center bg-primary text-white'>
              <h1 className='font-semibold text-2xl'>Voting Starts In:</h1>
              <section className='text-red-900 font-semibold py-1'>
                <p>
                  Some <span className='text-white'>time</span> from <span className='text-white'>now</span>
                </p>
              </section>
            </div>
        }
      </section>
    </div>
  )
}

export default Vote