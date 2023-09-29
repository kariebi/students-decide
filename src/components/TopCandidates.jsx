import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../tools/vote/VoteSlice';
import { useGetCandidatesFacultyQuery } from '../tools/vote/VoteApiSlice';
import { PulseLoader } from 'react-spinners';

const TopCandidates = () => {
  const dispatch = useDispatch();
  const { data: candidates, isLoading, isError, error } = useGetCandidatesFacultyQuery();

  useEffect(() => {
    if (isError) {
      console.log(error);
      console.log(error.status);
      if (!error.status) {
        console.log('No Server Response');
      } else if (error.status === 400) {
        console.log('Incorrect Username or Password');
      } else if (error.status === 401) {
        console.log('Unauthorized');
      } else if (error.status === 500) {
        console.log('Server-Side Error');
      } 
      else {
        console.log(error.data?.message);
      }
    }

    // Store data in Redux state
    if (candidates) {
      dispatch(setCredentials({ candidates }));
    }

    // Store data in localStorage
    if (candidates) {
      localStorage.setItem('candidates', JSON.stringify(candidates));
    }
  }, [isError, error, candidates, dispatch]);

  return (
    <div className='w-full h-full'>
      {isLoading ? (
        <PulseLoader size={5} color={"#22C55E"} />
      ) : (
        <div>
          {/* Render your candidate data here */}
          {candidates && candidates.map(candidate => (
            <div key={candidate.id}>
              {candidate.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCandidates;
