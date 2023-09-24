import React from 'react'
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons"


const DashNavbar = () => {
  return (
    <div className='w-screen'>
      <div className='flex flex-col fixed w-full'>
        <div className='h-20 w-full backdrop-blur-md  flex items-center flex-row'>
          <nav className='flex items-center justify-between w-full px-3'>
            <p>Logo</p>
            <div className='w-[3.75rem] h-[3.75rem]  flex justify-center items-center rounded-full bg-black'>
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                style={{ color: "#007f00" }} />
            </div>
          </nav>
        </div>
        <hr className='border border-primary' />
      </div>
    </div>
  )
}

export default DashNavbar