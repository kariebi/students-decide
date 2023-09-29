// LogoutButton.jsx
import { useDispatch } from 'react-redux';
import { logOut } from '../tools/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage

    // Dispatch the logout action
    dispatch(logOut());
    navigate('/'); // Redirect to the home page
  };

  return (
    <button
      className='text-primary px-2 py-1 bg-black rounded-xl font-semibold flex transition duration-300 transform hover:scale-105 items-center hover:text-primary hover:bg-white'
      onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
