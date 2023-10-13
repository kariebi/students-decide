import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import PulseLoader from 'react-spinners/PulseLoader';
import { useGetFacultyVotesQuery } from '../tools/vote/VoteApiSlice';

import { BASE_URL } from '../../constants'

const CandidatesInformation = () => {
  const { data: roles, isLoading, isError, error } = useGetFacultyVotesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedRoleForModal, setSelectedRoleForModal] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedCandidate(null);
  };

  const handleRoleSelectorScroll = (e) => {
    e.preventDefault();
    const delta = e.deltaY || (-e.nativeEvent.wheelDelta / 40) || 0;
    const rolesContainer = document.getElementById('roles-container');
    if (rolesContainer) {
      rolesContainer.scrollLeft -= delta;
    }
  };

  const handleDetailsClick = (role, candidate) => {
    // Disable body scrolling when the modal is opened
    document.body.style.overflow = 'hidden';
    setSelectedRoleForModal(role);
    setSelectedCandidate(candidate);
  };

  const handleCloseDetails = () => {
    // Enable body scrolling when the modal is closed
    document.body.style.overflow = 'auto';
    setSelectedCandidate(null);
    setSelectedRoleForModal(null);
  };


  const filteredRoles = roles?.map(role => ({
    ...role,
    candidates: role.candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const rolesWithContent = filteredRoles?.filter(role => role.candidates.length > 0);

  const filteredRolesByRole = selectedRole === 'All'
    ? rolesWithContent
    : rolesWithContent.filter(role => role.name === selectedRole);

  const hasSearchResults = filteredRolesByRole?.some(role => role.candidates.length > 0);

  useEffect(() => {
    const rolesContainer = document.getElementById('roles-container');
    if (rolesContainer) {
      rolesContainer.addEventListener('wheel', handleRoleSelectorScroll, { passive: false });

      return () => {
        // Cleanup: remove the event listener on component unmount
        rolesContainer.removeEventListener('wheel', handleRoleSelectorScroll);
      };
    }
  }, []);

  return (
    <div className='flex-grow w-full h-full flex flex-col'>
      {/* Navbar */}
      <nav className='fixed z-40 flex flex-col w-full bg-faintgreen backdrop-blur-md'>
        <section className='w-full flex justify-center text-center py-4 font-semibold bg-primary'>
          <div className='container'>
            <header className='flex w-full px-2 justify-center items-center'>
              <Link to='/userdashboard' className='absolute left-4'>
                <FontAwesomeIcon icon={faLessThan} size="lg" style={{ color: "#ffffff" }} />
              </Link>
              <p className='text-white'>Candidates Information</p>
            </header>
          </div>
        </section>
        {/* Search Bar */}
        <div className='w-full flex items-center justify-center rounded-b-2xl sm:rounded-none bg-primary'>
          <div className='w-[96%] flex items-center sm:max-w-[400px] rounded-2xl bg-white m-2 mt-0 py-2 px-3'>
            <FontAwesomeIcon icon={faSearch} size="sm" style={{ color: "#a0aec0" }} />
            <input
              type='text'
              placeholder='Search candidates...'
              className='focus:outline-none flex-grow ml-1'
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        {/* Role Selector */}
        <div
          id="roles-container"
          className='flex gap-2 whitespace-nowrap p-2 overflow-x-scroll'
          onWheel={handleRoleSelectorScroll}
          onTouchMove={handleRoleSelectorScroll}
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: '0', scrollbarColor: 'transparent transparent' }}>
          <div
            onClick={() => handleRoleSelect('All')}
            className={`px-6  text-center rounded-full cursor-pointer p-2 ${selectedRole === 'All' ? 'text-white bg-primary ' : ' text-black bg-primary/40'}`}
          >
            All
          </div>
          {rolesWithContent?.map(role => (
            <div
              key={role.name}
              onClick={() => handleRoleSelect(role.name)}
              className={`min-w-[100px] flex-shrink-0 text-center rounded-full cursor-pointer p-2  ${selectedRole === role.name ? 'bg-primary text-white' : 'text-black bg-primary/40'}`}
            >
              {role.name}
            </div>
          ))}
        </div>
      </nav>
      {/* Body of the page */}
      <section className='flex-grow pt-[165px] flex flex-col w-full justify-center items-center'>
        <div className='container w-full h-full flex flex-col flex-grow'>
          {/* Render Roles and Candidates */}
          {isLoading ? (
            <p className='w-full h-full flex items-center justify-center text-center flex-grow'>
              <PulseLoader size={15} color={"#22C55E"} />
            </p>
          ) : isError ? (
            <p>Error: {error.status}</p>
          ) : hasSearchResults ? (
            filteredRolesByRole?.map(role => (
              role.candidates.length > 0 && (
                <div key={role.name} className='mb-0'>
                  <h2 className='text-2xl ml-2 text-black font-semibold'>{role.name}</h2>
                  <hr className='border border-primary/50 my-1' />
                  <div className='flex flex-wrap'>
                    {role.candidates.map(candidate => (
                      <div key={candidate.name} className='w-1/2 sm:w-1/3 lg:w-1/4 p-2'>
                        {/* Candidate Card */}
                        <div
                        onClick={() => handleDetailsClick(role.name, candidate)}
                          className='flex flex-col bg-faintgreen hover:bg-faintgreen text-white  hover:scale-[0.95] transition duration-500 bg-cover bg-center   justify-center text-center p-4 rounded-md relative'
                          style={{
                            backgroundImage: candidate.image ? `url(${BASE_URL}${candidate.image})` : 'none',
                          }}
                        >
                        <div
                            className={`absolute inset-0 shadow-inner rounded-md bg-green-900/70`}
                          ></div>
                          <p className='font-bold z-10'>{candidate.name}</p>
                          <p className='z-10'><b>Position:</b> {role.name}</p>
                          <p className='z-10'><b>Total Votes:</b> {candidate.total_votes}</p>
                          <button
                            className='bg-primary/90 z-10 text-white px-2 py-1 mt-2 rounded-md transition hover:bg-faintgreen'
                            onClick={() => handleDetailsClick(role.name, candidate)}
                          >
                            Details
                          </button>
                        </div>

                        {/* Details Modal */}
                        {selectedCandidate && selectedRoleForModal === role.name && selectedCandidate === candidate && (
                          <div
                            className='fixed inset-0 z-50 backdrop-blur bg-black bg-opacity-50 flex items-center justify-center'
                            onClick={handleCloseDetails} // Close the modal when the dark area is clicked
                          >
                            <div className='bg-faintgreen p-4 sm:max-w-md mx-auto rounded-md w-[95%]' onClick={(e) => e.stopPropagation()}>
                              {/* Stop propagation to prevent the modal from closing when clicked inside */}
                              {candidate.image ? (
                                <img
                                  src={`${BASE_URL}${candidate.image}`}
                                  alt={candidate.name}
                                  className="w-12 h-12 rounded-full object-cover bg-black/10"
                                />
                              ) : (
                                <div
                                  className="w-12 h-12 rounded-full bg-black/10 flex justify-center items-center"
                                >
                                  <FontAwesomeIcon
                                    icon={faUser}
                                    size="lg"
                                    style={{ color: "#007f00" }} />
                                </div>
                              )}
                              <p className='font-bold text-2xl'>{selectedCandidate.name}</p>
                              <p><b>Position:</b> {selectedRoleForModal}</p>
                              <b>Manifesto:</b>
                              <section className="max-h-[70vh] overflow-x-auto">
                                <p className='text-sm'>{selectedCandidate.manifesto}</p>
                              </section>
                              <button
                                className='bg-primary text-white px-2 py-1 rounded-md mt-2 hover:bg-black/90'
                                onClick={handleCloseDetails}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                </div>
              )
            ))
          ) : (
            <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
              <p>No search results for <b>'{searchTerm}'</b> </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CandidatesInformation;
