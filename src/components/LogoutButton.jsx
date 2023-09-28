// LogoutButton.jsx
import { useDispatch } from 'react-redux';
import { logOut } from '../tools/auth/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Dispatch the logout action
    dispatch(logOut());

    // Redirect to the home page or any other desired route
    // You can use react-router-dom's `useNavigate` for this purpose
    // Example: const navigate = useNavigate();
    // navigate('/'); // Redirect to the home page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
