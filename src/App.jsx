import { Route, Routes } from 'react-router-dom';
import PrimaryLayout from './Layouts/PrimaryLayout';
import DashLayout from './Layouts/DashLayout';
import Home from './pages/Home';
import PasswordRecovery from "./pages/PasswordRecovery";
import SignIn from './pages/SignIn'

import ProtectedRoute from './tools/auth/ProtectedRoute'
import UserDashboard from './pages/UserDashboard'
import Vote from './pages/Vote'
import CandidatesInformation from './pages/CandidatesInformation'
import ElectionStatus from './pages/ElectionStatus'

import Missing from './pages/Missing';

import './main.css';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<PrimaryLayout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<Missing />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='passwordrecovery' element={<PasswordRecovery />} />
          {/* Protected Routes */}
          {/* <Route element={<ProtectedRoute/>}> */}
            <Route path='userdashboard' element={<DashLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path='vote'  element={<Vote />} />
              <Route path='ElectionStatus'  element={<ElectionStatus />} />
              <Route path='CandidatesInformation'  element={<CandidatesInformation />} />
            </Route>
          {/* </Route> */}
        </Route>
      </Routes>
    </>
  )
};

export default App;
