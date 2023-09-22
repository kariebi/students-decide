import { Route, Routes } from 'react-router-dom';
import PrimaryLayout from './Layouts/PrimaryLayout';
import DashLayout from './Layouts/DashLayout';
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import UserDashboard from './pages/UserDashboard'


import './main.css';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<PrimaryLayout />}>
          <Route index element={<Home />} />
          <Route path='signin' element={<SignIn />} />
          <Route path="dash" element={<DashLayout />}>
          <Route path='userdahsboard' element={<UserDashboard/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
};

export default App;
