import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faSearch, faCheckCircle, faClose } from '@fortawesome/free-solid-svg-icons';

import PulseLoader from 'react-spinners/PulseLoader';

import { useGetFacultyVotesQuery, usePostFacultyVotesMutation } from '../tools/vote/VoteApiSlice';

const Vote = () => {
  const { data: roles, isLoading, isError, error } = useGetFacultyVotesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [votedCandidates, setVotedCandidates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [postVotesMutation] = usePostFacultyVotesMutation();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedCandidate(null); // Reset selected candidate when role changes
  };

  const handleRoleSelectorScroll = (e) => {
    e.preventDefault();
    const delta = e.deltaY || (-e.nativeEvent.wheelDelta / 40) || 0;
    const rolesContainer = document.getElementById('roles-container');

    if (rolesContainer) {
      rolesContainer.scrollLeft -= delta;
    }
  };

  const handleVoteClick = (role, candidate) => {
    // Check if the candidate is already voted
    const isVoted = votedCandidates.some(
      (voted) => voted.role === role.position_id && voted.candidate === candidate
    );

    if (isVoted) {
      // If already voted, remove only the one with the same role.position_id
      setVotedCandidates((prevVotedCandidates) =>
        prevVotedCandidates.filter((voted) => !(voted.role === role.position_id))
      );
    } else {
      // Add the new vote to votedCandidates
      setVotedCandidates((prevVotedCandidates) => [
        ...prevVotedCandidates.filter((voted) => voted.role !== role.position_id), // Remove any previous votes for the same role
        { role: role.position_id, candidate: candidate },
      ]);
    }

    // Update the appearance of the voted candidate
    setSelectedCandidate({ role: role.position_id, candidate: candidate });
  };

  const handleSubmitVotes = () => {
    // Show confirmation box
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirm) => async () => {
    if (confirm) {
      setIsSubmitting(true);

      try {
        // Extracting only candidate IDs for submission
        const voteData = votedCandidates.map((vote) => ({
          position_id: vote.role,
          candidate_id: vote.candidate.id,
        }));

        console.log(JSON.stringify({ votes: voteData }));
        await postVotesMutation(JSON.stringify({ votes: voteData }));

        // Clear voted candidates after successful submission
        setVotedCandidates([]);
        setShowSuccess(true);

        // Hide success message after 2 seconds
        setTimeout(() => {
          setShowSuccess(false);
          setShowConfirmation(false);
        }, 2500);
      } catch (error) {
        console.error('Error submitting votes:', error.message);
        console.log(error);
        // Handle error, show user a message, etc.
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // If the user clicks "No" or closes the box
      setShowConfirmation(false);
    }
  };

  const filteredRoles = roles?.map((role) => ({
    ...role,
    candidates: role.candidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const rolesWithContent = filteredRoles?.filter((role) => role.candidates.length > 0);

  const filteredRolesByRole =
    selectedRole === 'All'
      ? rolesWithContent
      : rolesWithContent.filter((role) => role.name === selectedRole);

  const hasSearchResults = filteredRolesByRole?.some((role) => role.candidates.length > 0);

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

  useEffect(() => {
    // Update the appearance of the previously selected candidate
    const prevSelectedCandidateElement = document.querySelector('.bg-selected');
    if (prevSelectedCandidateElement) {
      prevSelectedCandidateElement.classList.remove('bg-selected');
    }

    // Update the appearance of the newly selected candidate
    if (selectedCandidate) {
      const selectedCandidateElement = document.getElementById(selectedCandidate.name);
      if (selectedCandidateElement) {
        selectedCandidateElement.classList.add('bg-selected');
      }
    }
  }, [selectedCandidate]);

  return (
    <div className='flex-grow w-full h-full flex flex-col'>
      {/* Navbar */}
      <nav className='fixed z-40 flex flex-col w-full bg-faintgreen'>
        <section className='w-full flex justify-center text-center py-4 font-semibold bg-primary'>
          <div className='container'>
            <header className='flex w-full px-2 justify-center items-center'>
              <Link to='/userdashboard' className='absolute left-4'>
                <FontAwesomeIcon icon={faLessThan} size='lg' style={{ color: '#ffffff' }} />
              </Link>
              <p className='text-white'>Vote</p>
            </header>
          </div>
        </section>
        {/* Search Bar */}
        <div className='w-full flex items-center justify-center rounded-b-2xl sm:rounded-none bg-primary'>
          <div className='w-[96%] flex items-center sm:max-w-[400px] rounded-2xl bg-white m-2 mt-0 py-2 px-3'>
            <FontAwesomeIcon icon={faSearch} size='sm' style={{ color: '#a0aec0' }} />
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
          id='roles-container'
          className='flex gap-2 whitespace-nowrap p-2 overflow-x-scroll bg-inherit'
          onWheel={handleRoleSelectorScroll}
          onTouchMove={handleRoleSelectorScroll}
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: '0',
            scrollbarColor: 'transparent transparent',
          }}
        >
          <div
            onClick={() => handleRoleSelect('All')}
            className={`px-6 text-center rounded-full text-white cursor-pointer p-2 ${selectedRole === 'All' ? 'bg-primary ' : 'bg-primaryblue/80'
              }`}
          >
            All
          </div>
          {rolesWithContent?.map((role) => (
            <div
              key={role.name}
              onClick={() => handleRoleSelect(role.name)}
              className={`min-w-[100px] flex-shrink-0 text-center rounded-full cursor-pointer text-white p-2  ${selectedRole === role.name ? 'bg-primary ' : 'bg-primaryblue/80'
                }`}
            >
              {role.name}
            </div>
          ))}
        </div>
      </nav>
      {/* Body of the page */}
      <section className='flex-grow pt-[165px] flex flex-col w-full justify-center items-center'>
        <div className='container w-full h-full flex flex-col flex-grow  mb-16'>
          {/* Render Roles and Candidates */}
          {isLoading ? (
            <p className='w-full h-full flex items-center justify-center text-center flex-grow'>
              <PulseLoader size={15} color={'#22C55E'} />
            </p>
          ) : isError ? (
            <p>Error: {error.status}</p>
          ) : hasSearchResults ? (
            filteredRolesByRole?.map((role) =>
              role.candidates.length > 0 ? (
                <div key={role.name} className='mb-0'>
                  <h2 className='text-2xl ml-2 font-semibold'>{role.name}</h2>
                  <hr className='border border-primary/50 my-1' />
                  <div className='flex flex-wrap'>
                    {role.candidates.map((candidate) => (
                      <div key={candidate.name} className='w-1/2 sm:w-1/3 lg:w-1/4 p-2'>
                        {/* Candidate Card */}
                        <div
                          className={`
          flex flex-col  justify-center text-center p-4 rounded-md relative
        ${selectedCandidate === candidate ? 'text-white' : ''}
        ${votedCandidates.some((voted) => voted.role === role.position_id && voted.candidate === candidate) ? 'bg-primaryblue/70' : 'bg-faintgreen '}
      `}
                          style={{
                            backgroundImage: candidate.image,
                          }}
                          onClick={() => handleVoteClick(role, candidate)}
                        >
                          <p className='font-bold'>{candidate.name}</p>
                          <p>
                            <b>Role:</b> {role.name}
                          </p>
                          <p>
                            <b>Total Votes:</b> {candidate.total_votes}
                          </p>
                          <button
                            className={`
     px-2 py-1 mt-2 rounded-md
    ${votedCandidates.some((voted) => voted.role === role.position_id && voted.candidate === candidate) ? 'bg-primaryblue cursor-not-allowed text-black shadow-inner' : ' text-white bg-primary/90 shadow-lg'}
  `}
                            onClick={() => handleVoteClick(role, candidate)}
                            disabled={votedCandidates.some((voted) => role.position_id === voted.role && voted.candidate === candidate)}
                          >
                            {votedCandidates.some((voted) => voted.role === role.position_id && voted.candidate === candidate)
                              ? <div className='flex justify-center gap-1'><div>Voted</div> <div><FontAwesomeIcon icon={faCheckCircle} /></div></div>
                              : selectedCandidate && selectedCandidate.role === role.position_id && selectedCandidate.candidate === candidate
                                ? 'Vote'
                                : 'Vote'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )
          ) : (
            <div className='w-full h-full flex items-center justify-center text-center flex-grow'>
              <p>No search results for <b>'{searchTerm}'</b> </p>
            </div>
          )}
        </div>
        {/* Vote Submission Component */}
        {showConfirmation && (
          <div className='fixed flex items-center justify-center h-screen z-50 top-0 p-4 backdrop-blur-md '>
            <div className='bg-faintgreen rounded-md max-w-[400px] text-center'>
              <div>
                <div className='cursor-pointer px-1.5 pt-1 flex justify-end' onClick={handleConfirmation(false)}>
                  <FontAwesomeIcon
                    icon={faClose} />
                </div>
              </div>
              <div className='flex flex-col p-4 pt-0'>
                <p>You have only voted in the categories you have selected. Are you sure you want to submit? <br /> <b className='uppercase text-sm'>You can only vote once</b></p>

                <div className='flex justify-center mt-4'>
                  {isSubmitting ?
                    <PulseLoader
                      size={5}
                      color='#007F00'
                    />
                    :
                    <>
                      {showSuccess ? 
                        <div className='flex justify-center'>
                          <div className='bg-primary text-white p-2 rounded-md max-w-[400px] text-center'>
                            <p>Votes submitted successfully!</p>
                          </div>
                        </div>
                      :
                      <>
                        <button
                          className='bg-primary transition duration-300 hover:text-white hover:bg-primaryblue w-1/2 text-white px-4 py-2 rounded-md mr-2'
                          onClick={handleConfirmation(true)}
                        >
                          Yes
                        </button>
                        <button
                          className='bg-gray-300 transition duration-300 hover:text-white hover:bg-primaryblue w-1/2 text-black px-4 py-2 rounded-md ml-2'
                          onClick={handleConfirmation(false)}
                        >
                          No
                        </button>
                      </>
                      }
                    </>
                    }
                </div>
              </div>

            </div>
          </div>
        )}
        {!showConfirmation && !showSuccess && (
          <div className='fixed flex justify-center bottom-0 left-0 right-0 p-4 backdrop-blur-md '>
            <button
              className={`bg-primary w-[96%] max-w-[400px] text-white px-4 py-2 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={handleSubmitVotes}
              disabled={isSubmitting}
            >
              Submit Votes
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Vote;
