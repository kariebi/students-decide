import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../tools/vote/VoteSlice';
import { useGetCandidatesQuery } from '../tools/vote/VoteApiSlice';
import { PulseLoader } from 'react-spinners';

const TopCandidates = () => {
  const dispatch = useDispatch();
  const { data: roles, isLoading, isError, error } = useGetCandidatesQuery();

  const handleTopCandidatesScroll = (e) => {
    e.preventDefault();

    const delta = e.deltaY || (-e.nativeEvent.wheelDelta / 40) || 0;
    const candidatesContainer = document.getElementById('top-candidates-container');

    if (candidatesContainer) {
      candidatesContainer.scrollLeft -= delta;
    }
  };

  useEffect(() => {
    const candidatesContainer = document.getElementById('top-candidates-container');
    if (candidatesContainer) {
      candidatesContainer.addEventListener('wheel', handleTopCandidatesScroll, { passive: false });

      return () => {
        // Cleanup: remove the event listener on component unmount
        candidatesContainer.removeEventListener('wheel', handleTopCandidatesScroll);
      };
    }
  }, []);
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
      } else {
        console.log(error.data?.message);
      }
    }

    // Store data in Redux state
    if (roles) {
      // Filter out roles without candidates
      const rolesWithCandidates = roles.filter(role => role.candidates && role.candidates.length > 0);

      // Sort candidates within each role based on total votes in descending order
      const sortedRoles = rolesWithCandidates.map(role => ({
        ...role,
        candidates: role.candidates.slice().sort((a, b) => b.total_votes - a.total_votes),
      }));

      dispatch(setCredentials({ roles: sortedRoles }));
    }

    // Store data in localStorage
    if (roles) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }, [isError, error, roles, dispatch]);

  return (
    <div id="top-candidates-container" className='w-full h-full overflow-x-scroll flex items-center'>
      {isLoading ? (
        <PulseLoader size={5} color={"#22C55E"} />
      ) : (
        <div className="flex flex-row">
          {/* Render your candidate data here */}
          {roles && roles.map(role => (
            role.candidates && role.candidates.length > 0 && (
              <div key={role.name} className="mb-2 pl-2 flex flex-row justify-center items-center flex-shrink-0 gap-2">
                {role.candidates.map(candidate => (
                  <div key={candidate.name} className="mb-2 p-2 rounded-xl bg-primary text-white flex flex-col justify-center items-center">
                    {candidate.image ? (
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-full object-cover "
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full bg-gray-300 "
                      // Add styles for circle shape
                      ></div>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold">{candidate.name}</h3>
                      <p className="text-xs">{role.name}</p>
                      <p className="text-xs">Total Votes: {candidate.total_votes}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCandidates;
