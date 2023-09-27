import { Link } from 'react-router-dom'
// import useAuth from '../hooks/useAuth'
// import useTitle from '../hooks/useTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea, faUsers, faChartSimple } from '@fortawesome/free-solid-svg-icons'

import DashNavbar from '../components/DashNavbar'


const UserDashboard = () => {

  // const { username, isManager, isAdmin } = useAuth()

  // useTitle(`UniEvoting: ${username}`)

  return (
    <div className='flex-grow w-full h-full'>
      <DashNavbar />
      {/* Links */}
      <div className='pt-[160px] text-black'>
        <section className='mt-5 flex flex-row justify-center h-40 sm:h-60 w-full'>
          <section className='w-[50%] max-w-[240px] mx-4 rounded-2xl bg-[#6AAD75] h-full'>
            <div className='w-full h-full p-3 flex flex-col'>
              <aside
                className='bg-white py-2 px-2 w-fit rounded-xl'
              >
                <FontAwesomeIcon
                  icon={faVoteYea}
                  size="2x"
                  style={{ color: "#991b1b" }}
                />
              </aside>
              <p className='font-bold text-white mt-auto'>
                Vote
              </p>
            </div>
          </section>
          <section className='w-[50%] max-w-[240px] mx-4 rounded-2xl bg-[#4D6D85] h-full'>
            <div className='w-full h-full p-3 flex flex-col'>
              <aside
                className='bg-white py-2 px-2 w-fit rounded-xl'
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  size="2x"
                  style={{ color: "#991b1b" }}
                />
              </aside>
              <p className='font-bold mt-auto text-white'>
                Candidates Information
              </p>
            </div>
          </section>
        </section>
      </div>
      {/* Top Candidates */}
      <div className='w-full'>
        <div className='flex flex-row w-full items-center pt-3 px-2'>
          <section className='pr-1'>
            <FontAwesomeIcon
              icon={faChartSimple}
              size='xl'
            />
          </section>
          <h1 className='font-semibold'>Top Candidates</h1>
        </div>
        <section className='pt-2 pl-2'>
          'This is where the candidate info will be mapped'
        </section>
      </div>
      <div className='w-full h-10 flex justify-center items-center'>
        <Link 
        className='border border-primary w-full max-w-[240px] text-center px-9 py-1 rounded text-primary'
        >
          Monitor Election
        </Link>
      </div>
    </div>
  )
}

export default UserDashboard