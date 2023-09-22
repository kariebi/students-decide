import React from 'react'


import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'


const Home = () => {
  return (
    <div className='min-h-screen w-full'>
      <div className='h-screen w-full'>
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </div>
  )
}

export default Home