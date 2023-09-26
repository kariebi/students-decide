import { Link } from 'react-router-dom'
// import useAuth from '../hooks/useAuth'
// import useTitle from '../hooks/useTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea } from '@fortawesome/free-solid-svg-icons'

import DashNavbar from '../components/DashNavbar'


const UserDashboard = () => {

  // const { username, isManager, isAdmin } = useAuth()

  // useTitle(`UniEvoting: ${username}`)

  return (
    <div className='flex-grow w-full h-full'>
      <DashNavbar />
      <div className='pt-[160px] text-black'>
        <section className='mt-5 flex flex-row justify-center h-40 sm:h-60 w-full'>
          <section className='w-[50%] max-w-[240px] mx-4 rounded-2xl bg-primary h-full'>
            <div>
              <FontAwesomeIcon icon={faVoteYea} />
            </div>
            <p className='font-bold text-white'>Some text</p>
          </section>
          <section className='w-[50%] max-w-[240px] mx-4 rounded-2xl bg-primary h-full'>
            <div>
              <FontAwesomeIcon icon={faVoteYea} />
            </div>
            <p className='font-bold text-white'>Some text</p>
          </section>
        </section>
      </div>
      <div>

      </div>
    </div>
  )
}

export default UserDashboard