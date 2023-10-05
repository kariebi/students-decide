import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PulseLoader } from 'react-spinners';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

import { useGetVotingPeriodQuery } from '../tools/vote/VoteApiSlice';

const ElectionStatus = () => {
  const { data: votingPeriod, isLoading } = useGetVotingPeriodQuery();

  const [electionStatus, setElectionStatus] = useState(null);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (votingPeriod && !isLoading) {
      const startDate = new Date(votingPeriod[0].start_date).getTime();
      const endDate = new Date(votingPeriod[0].end_date).getTime();
      const now = new Date().getTime();

      let timeDifference;
      let countdownMessage;

      if (now < startDate) {
        timeDifference = startDate - now;
        countdownMessage = 'Election will start in';
      } else if (now < endDate) {
        timeDifference = endDate - now;
        countdownMessage = 'Time left until the end of the election';
      } else {
        setElectionStatus('Election has ended');
        return; // No need to continue if the election has ended
      }

      const intervalId = setInterval(() => {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);

        if (timeDifference <= 0) {
          setElectionStatus('Election has started');
          clearInterval(intervalId);
        }

        timeDifference -= 1000;
      }, 1000);

      setElectionStatus(countdownMessage);

      return () => clearInterval(intervalId);
    }
  }, [votingPeriod, isLoading]);

  return (
    <div className='flex-grow w-full h-full flex flex-col'>
    {/* Navbar */}
      <nav className='fixed z-40 flex flex-col w-full'>
        <section className='w-full flex justify-center text-center py-4 font-semibold bg-primary'>
          <div className='container'>
            <header className='flex w-full px-2 justify-center items-center'>
              <Link to='/userdashboard' className='absolute left-4'>
                <FontAwesomeIcon icon={faLessThan} size='lg' style={{ color: '#ffffff' }} />
              </Link>
              <p className='text-white'>Election Status</p>
            </header>
          </div>
        </section>
      </nav>
      {/* Body of the page */}
      <section className='pt-14 flex flex-col w-full justify-center items-center'>
        <div className='container flex flex-wrap'>
          {isLoading ? (
            <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
              <PulseLoader size={15} color={"#22C55E"} />
            </div>
          ) : (
            <div className='text-2xl font-semibold w-full h-full flex items-center justify-center text-center flex-grow'>
              <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
                {electionStatus !== null ? (
                  <div>
                    <p className='text-sm'>{electionStatus}</p>
                    <p>{days}d {hours}h {minutes}m {seconds}s</p>
                  </div>
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
                    <PulseLoader size={15} color={"#22C55E"} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ElectionStatus;
