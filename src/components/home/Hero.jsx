import React from 'react'
import { Link } from 'react-router-dom';

import Lottie from 'react-lottie';
import animationData from '../../assets/voting animation.json';


const Hero = () => {

  const isLoggedIn = localStorage.getItem('isLoggedIn')
  // console.log(isLoggedIn)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className='flex flex-col flex-grow w-full pt-20'>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
      />
      <div className='w-full flex justify-center items-center mt-5'>
        {
          isLoggedIn == 'true' ?
            <Link
            to='/userdashboard'
            className='p-2 bg-primary min-w-[120px] text-center transition duration-300 text-white rounded-3xl hover:bg-primaryblue'>
              Vote Now
            </Link>
            :
            <Link 
            to='/signin'
            className='p-2 bg-primary min-w-[120px] text-center transition duration-300 text-white rounded-3xl hover:bg-primaryblue'>
              Get Started
            </Link>
        }
      </div>
    </div>
  )
}

export default Hero