import React from 'react';

import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Steps from '../components/home/Steps'
import About from '../components/home/About';
import Footer from '../components/home/Footer';


const Home = () => {
  return (
    <div className='min-h-screen bg-BaseBackground w-full'>
      <div className='h-screen w-full'>
        <Navbar />
        <Hero />
      </div>
      <Steps/>
      <About/>
      <Footer />
    </div>
  )
}

export default Home;