import React, { useState, useEffect } from 'react';
// import useAuth from '../hooks/useAuth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClock } from "@fortawesome/free-solid-svg-icons"
import { PulseLoader } from 'react-spinners';

import { useGetVotingPeriodQuery } from '../tools/vote/VoteApiSlice';

import LogoutButton from './LogoutButton';



const DashNavbar = () => {
  const { data: votingPeriod, isLoading } = useGetVotingPeriodQuery();
  const registrationNumber = localStorage.getItem('registrationNumber')
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
        countdownMessage = 'Election will start in:';
      } else if (now < endDate) {
        timeDifference = endDate - now;
        countdownMessage = 'Election will end in:';
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
    <div className='w-screen z-20 flex flex-col items-center'>
      <div className='justify-center items-center flex flex-col fixed w-full sm:bg-primary bg-transparent'>
        <div className='container pb-4 bg-primary rounded-b-2xl'>
          <div className='h-20 w-full  flex items-center flex-row'>
            <nav className='flex items-center justify-start w-full px-3'>
              <div className='w-[2.75rem] h-[2.75rem]  flex justify-center items-center rounded-full bg-faintgreen'>
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  style={{ color: "#007f00" }} />
              </div>
              <div className='pl-2 text-white'>
                <h1>Hello <b className='text-bold'>{registrationNumber}</b> </h1>
                <h2>FUTO</h2>
              </div>
              <div className='ml-auto p-2'>
                <LogoutButton />
              </div>
            </nav>
          </div>
          {/* Voting Timer Component */}
          <div className='w-full bg-primary'>
            <section className='rounded-xl bg-faintgreen text-black flex py-1 m-5 mt-0 items-center'>
              <aside className='px-2'>
                <FontAwesomeIcon
                  icon={faClock}
                  size="lg"
                  color='#000'
                />
              </aside>
              <div>
                {isLoading ? (
                  <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
                    <PulseLoader size={5} color={"#000000"} />
                  </div>
                ) : (
                  <div className='text-2xl font-semibold w-full h-full flex flex-grow'>
                    <div className='w-full h-full flex flex-grow'>
                      {electionStatus !== null ? (
                        <div>
                          <p className='text-sm'>{electionStatus}</p>
                          <p className='text-sm'>{days}d {hours}h {minutes}m {seconds}s</p>
                        </div>
                      ) : (
                        <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
                          <PulseLoader size={15} color={"#000000"} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashNavbar