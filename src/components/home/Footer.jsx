import React from 'react'
import { Link } from 'react-router-dom'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <div className='w-full bg-primary text-white flex flex-col justify-center items-center pb-1'>
      <hr className='border border-primary w-full' />
      <p className=' pt-1'>
        students decide<sup>&copy;</sup>2023
      </p>
      <Link 
      to="https://github.com/Ulpha-Deep-Labs/unievotingfrontend"
      className=' p-0.5 flex justify-center items-center rounded-full bg-white/30 hover:text-primaryblue hover:bg-primaryblue/60'>
        <FontAwesomeIcon
          icon={faGithub}
          size="lg"
           />
      </Link>
    </div>
  )
}

export default Footer