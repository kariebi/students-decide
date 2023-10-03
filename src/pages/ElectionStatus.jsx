import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import { useGetVotingPeriodQuery } from '../tools/vote/VoteApiSlice';
import { PulseLoader } from 'react-spinners';

const ElectionStatus = () => {
  const { data: votingPeriod, isLoading } = useGetVotingPeriodQuery();
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (votingPeriod && !isLoading) {
      // const endDate = new Date(votingPeriod[0].end_date).getTime();

      const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime();

      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const timeDifference = endDate - now;

        if (timeDifference <= 0) {
          setCountdown('Election has started');
          clearInterval(intervalId);
        } else {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [votingPeriod, isLoading]);

  return (
    <div className='flex-grow w-full h-full flex flex-col'>
      <nav className='fixed z-40 flex flex-col w-full'>
        <section className='w-full flex justify-center text-center py-4 font-semibold bg-primary'>
          <div className='container'>
            <header className='flex w-full px-2 justify-center items-center'>
              <Link to='/userdashboard' className='absolute left-2'>
                <FontAwesomeIcon icon={faLessThan} size='lg' style={{ color: '#ffffff' }} />
              </Link>
              <p className='text-white'>Election Status</p>
            </header>
          </div>
        </section>
      </nav>
      {/* Body of the page */}
      <section className='pt-12 flex flex-col w-full justify-center items-center'>
        <div className='container flex flex-wrap'>
          {isLoading ? (
            <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
              <PulseLoader size={15} color={"#22C55E"} />
            </div>
          ) : (
            <div className='text-2xl font-semibold'>
              <div>
                {countdown !== null ? countdown : 'Loading...'}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ElectionStatus;
