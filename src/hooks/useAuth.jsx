// useAuth.jsx
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectRegistrationNumber } from "../tools/auth/authSlice";
// import jwtDecode from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    const registrationNumber = useSelector(selectRegistrationNumber); // Select the registration number

    //   let isManager = false;
    //   let isAdmin = false;
    let status = "Student";
    let isLoggedIn = !!token; // Check if the token is present

    // if (token) {
    //     const decoded = jwtDecode(token);
    //     const { username, roles } = decoded.UserInfo;

    //     isManager = roles.includes('Manager');
    //     isAdmin = roles.includes('Admin');

    //     if (isManager) status = "Manager";
    //     if (isAdmin) status = "Admin";
    // }

    return {
        // username,
        // roles,
        status,
        // isManager,
        // isAdmin,
        isLoggedIn,
        registrationNumber
    };
};

export default useAuth;
