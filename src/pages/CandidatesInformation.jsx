import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons';


import { positions } from '../../constants';


const CandidatesInformation = () => {
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
          <p>Candidates Information</p>
        </header>
      </section>
      {/* Position buttons or links */}
      <section className='pt-12 flex flex-col w-full justify-center items-center'>
        <div className='container flex flex-wrap'>
          {positions.map((position, index) => (
            <section
              key={index}
              className='bg-primary text-white m-2 w-[90%] text-center items-center py-4 rounded-lg flex-grow sm:w-1/2 md:w-1/3 lg:w-1/4'
            >
              <header>
                <p>{position}</p>
              </header>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CandidatesInformation;
