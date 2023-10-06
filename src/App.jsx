import React, { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';
import PrimaryLayout from './Layouts/PrimaryLayout';
import DashLayout from './Layouts/DashLayout';
import PasswordRecovery from "./pages/PasswordRecovery";
import SignIn from './pages/SignIn'

import ProtectedRoute from './tools/auth/ProtectedRoute'
import Vote from './pages/Vote'
import CandidatesInformation from './pages/CandidatesInformation'
import ElectionStatus from './pages/ElectionStatus'
import Loader from './components/Loader';
import Missing from './pages/Missing';

const Home = lazy(() => import('./pages/Home'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

import './main.css';



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<PrimaryLayout />}>
          <Route index element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
          <Route path='*' element={<Missing />} />
          <Route path='signin' element={<SignIn />} />
          {/* <Route path='loader' element={<Loader/>}/> */}
          <Route path='passwordrecovery' element={<PasswordRecovery />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashLayout />}>
              <Route path='userdashboard' element={<Suspense fallback={<Loader />}><UserDashboard /></Suspense>} />
              <Route path='vote' element={<Vote />} />
              <Route path='ElectionStatus' element={<ElectionStatus />} />
              <Route path='CandidatesInformation' element={<CandidatesInformation />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
};

export default App;
