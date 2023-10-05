import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PulseLoader } from 'react-spinners';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

import Loader from "../components/Loader";
import { useGetVotingPeriodQuery, useGetFacultyVotesQuery } from '../tools/vote/VoteApiSlice';

const ElectionStatus = () => {
  const { data: votingPeriod, isLoading: votingPeriodLoading } = useGetVotingPeriodQuery();
  const { data: facultyVotes, isLoading: facultyVotesLoading, isError: facultyVotesError } = useGetFacultyVotesQuery();

  const [electionStatus, setElectionStatus] = useState(null);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (votingPeriod && !votingPeriodLoading) {
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
        countdownMessage = 'Election wil end in:';
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
  }, [votingPeriod, votingPeriodLoading]);

  if (votingPeriodLoading || facultyVotesLoading) {
    // If either of the queries is loading, display the Loader component
    return <Loader />;
  }

  return (
    <div className='flex-grow w-full h-full flex flex-col'>
      {/* Navbar */}
      <nav className='fixed z-40 flex flex-col w-full'>
        <section className='w-full flex justify-center text-center py-4 font-semibold bg-primary rounded-b-2xl sm:rounded-none'>
          <div className='container'>
            <header className='flex w-full px-2 justify-center items-center'>
              <Link to='/userdashboard' className='absolute left-4'>
                <FontAwesomeIcon icon={faLessThan} size='lg' style={{ color: '#ffffff' }} />
              </Link>
              <p className='text-white'>Election Status</p>
            </header>
            {/* Timer */}
            {votingPeriodLoading ? (
              <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
                <PulseLoader size={15} color='#ffffff' />
              </div>
            ) : (
              <div className='text-2xl font-semibold w-full h-full flex items-center justify-center text-center flex-grow'>
                <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
                  {electionStatus !== null ? (
                    <div className='text-faintgreen w-[99%] py-0.5 bg-black rounded-2xl'>
                      <p className='text-sm'>{electionStatus}</p>
                      <p>{days}d {hours}h {minutes}m {seconds}s</p>
                    </div>
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
                      <PulseLoader size={15} color='#22C55E' />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </nav>
      {/* Body of the page */}
      <section className='pt-20 flex flex-col w-full justify-center items-center'>
        <div className='container flex flex-wrap'>
          {/* Candidate voting info such as name, total_votes, image */}
          {facultyVotesLoading ? (
            <div className='w-full h-screen flex items-center justify-center text-center flex-grow'>
              <PulseLoader size={15} color='#22C55E' />
            </div>
          ) : facultyVotesError ? (
            <div>Error loading faculty votes</div>
          ) : (
            <div className='flex flex-col mt-8 w-full justify-center items-center'>
              {facultyVotes?.map((position) => (
                <Link 
                to='/candidatesinformation'
                key={position.position_id} 
                className='bg-faintgreen/30 hover:scale-[0.95] transition duration-500 p-4 w-full rounded-md shadow-md m-4'>
                  <h2 className='text-lg font-semibold'>{position.name}</h2>
                  <hr className='border-t border-gray-300 my-2' />
                  <div className='space-y-2'>
                    {position.candidates.map((candidate) => (
                      <div key={candidate.id} className='flex items-center gap-2'>
                        <div className='w-10 h-10 rounded-full bg-faintgreen'>
                          {candidate.image && (
                            <img
                              src={candidate.image}
                              alt={candidate.name}
                              className='w-10 h-10 object-cover rounded-full'
                            />
                          )}
                        </div>

                        <div className='flex-grow'>
                          <p className='font-semibold'>{candidate.name}</p>
                          <p><b>Total Votes:</b> {candidate.total_votes}</p>
                          {/* <p>
                            Voting Percentage: {((candidate.total_votes / position.candidates.reduce((acc, curr) => acc + curr.total_votes, 0)) * 100).toFixed(2)}%
                          </p> */}
                          {/* Progress bar */}
                          <div className='relative pt-1'>
                            <div className='flex mb-2 items-center justify-between'>
                              <div>
                                <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-faintgreen bg-gray-200'>
                                  {((candidate.total_votes / position.candidates.reduce((acc, curr) => acc + curr.total_votes, 0)) * 100).toFixed(2)}%
                                </span>
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <div className='w-full bg-gray-200 rounded-full'>
                                <div
                                  className='w-full bg-faintgreen leading-none py-1 rounded-full'
                                  style={{
                                    width: `${((candidate.total_votes / position.candidates.reduce((acc, curr) => acc + curr.total_votes, 0)) * 100).toFixed(2)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ElectionStatus;
