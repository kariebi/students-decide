import { Route, Routes } from 'react-router-dom';
import PrimaryLayout from './Layouts/PrimaryLayout';
import DashLayout from './Layouts/DashLayout';
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import UserDashboard from './pages/UserDashboard'
import PasswordRecovery from "./pages/PasswordRecovery";
import Missing from './pages/Missing';
import PersistLogin from '../src/tools/auth/PersistLogin'

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
          <Route element={<PersistLogin />}>
            <Route path='userdashboard' element={<DashLayout />}>
              <Route index element={<UserDashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
};

export default App;
