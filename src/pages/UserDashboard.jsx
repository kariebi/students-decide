import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea, faUsers, faChartSimple } from '@fortawesome/free-solid-svg-icons'

// import useAuth from '../hooks/useAuth'
import useTitle from '../hooks/useTitle'

import TopCandidates from '../components/TopCandidates'
import DashNavbar from '../components/DashNavbar'
import Footer from '../components/home/Footer'


const UserDashboard = () => {

  const registrationNumber = localStorage.getItem('registrationNumber')
  useTitle(`UniEvoting: ${registrationNumber}`)

  return (
    <div className='flex-grow w-full h-full pb-2 flex flex-col bg-faintgreen/40 items-center'>
      <DashNavbar />
      {/* Links */}
      <div className='pt-[160px] container text-black'>
        <section className='mt-5 flex flex-row justify-center h-40 sm:h-60 w-full'>
          <Link
            to='/vote'
            className='w-[50%] max-w-[240px] mx-4 rounded-2xl bg-faintgreen h-full transition duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl'>
            <div className='w-full h-full p-3 flex flex-col'>
              <aside
                className='bg-white py-2 px-2 w-fit rounded-xl'
              >
                <FontAwesomeIcon
                  icon={faVoteYea}
                  size="2x"
                  style={{ color: "#6AAD75" }}
                />
              </aside>
              <p className='font-bold text-white mt-auto'>
                Vote
              </p>
            </div>
          </Link>
          <Link
            to='/CandidatesInformation'
            className='w-[50%] max-w-[240px] mx-4 rounded-2xl bg-primaryblue h-full transition duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl'>
            <div className='w-full h-full p-3 flex flex-col'>
              <aside
                className='bg-white py-2 px-2 w-fit rounded-xl'
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  size="2x"
                  style={{ color: "#4D6D85" }}
                />
              </aside>
              <p className='font-bold mt-auto text-white'>
                Candidates Information
              </p>
            </div>
          </Link>
        </section>
      </div>
      {/* Top Candidates */}
      <div className='w-full container text-center flex flex-col'>
        <div
          className=''
        >
          <div className='flex flex-row w-full items-center pt-3 px-2'>
            <section className='pr-1'>
              <FontAwesomeIcon
                icon={faChartSimple}
                size='xl'
              />
            </section>
            <h1 className='font-semibold'>Top Candidates</h1>
          </div>
          <section className='py-4'>
            <TopCandidates />
          </section>
        </div>
      </div>
      <div className='w-full px-2 mb-2 h-10 flex justify-center items-center'>
        <Link
          to='/ElectionStatus'
          className=' bg-primaryblue w-full max-w-[350px] text-center px-9 py-1 rounded-lg text-white transition duration-300 hover:bg-primary hover:text-white'
        >
          Monitor Election
        </Link>
      </div>
      <Footer/>
    </div>
  )
}

export default UserDashboard