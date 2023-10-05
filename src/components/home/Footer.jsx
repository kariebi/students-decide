import React from 'react'
import { Link } from 'react-router-dom'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center pb-1'>
      <hr className='border border-primary w-full' />
      <p className='text-primary pt-1'>
        Student Dictates<sup>&copy;</sup>2023
      </p>
      <Link 
      to="https://github.com/Ulpha-Deep-Labs/unievotingfrontend"
      className=' p-0.5 flex justify-center text-primary items-center rounded-full bg-faintgreen hover:text-primaryblue hover:bg-primaryblue/60'>
        <FontAwesomeIcon
          icon={faGithub}
          size="lg"
           />
      </Link>
    </div>
  )
}

export default Footer