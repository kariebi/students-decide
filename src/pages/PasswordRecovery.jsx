import React, { useState } from 'react';
import { usePasswordRecoveryMutation } from '../tools/auth/authApiSlice';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation();

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    // Use regex to validate the email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsEmailValid(emailRegex.test(inputEmail));
    setEmail(inputEmail);
  };

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    if (isEmailValid) {
      try {
        // Send a password recovery request to the server
        await passwordRecovery(email).unwrap();
        // Handle success, e.g., show a success message to the user
        alert('Password recovery email sent. Please check your inbox.');
        // You can redirect the user to a success page or perform other actions here
      } catch (error) {
        // Handle errors, e.g., display an error message to the user
        alert('Password recovery failed. Please try again later.');
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Password Recovery</h2>
      <form onSubmit={handlePasswordRecovery}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {isEmailValid ? (
            <span style={{ color: 'green' }}>Valid email address</span>
          ) : (
            <span style={{ color: 'red' }}>Invalid email address</span>
          )}
        </div>
        <div>
          <button type="submit" disabled={!isEmailValid || isLoading}>
            {isLoading ? 'Sending...' : 'Send Password Recovery Email'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordRecovery;
