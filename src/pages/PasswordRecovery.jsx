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
    <div className='w-full h-screen bg-BaseBackground text-white flex flex-col justify-center items-center'>
      <section className='bg-black/70 rounded-3xl max-w-[300px] w-[95%] h-[280px] p-5 '>
        <form onSubmit={handlePasswordRecovery}>
          <div className='flex flex-col h-full'>
            <div className="welcome-lines text-center leading-tight">
              <div className="welcome-line-1 text-green-500 font-semibold text-4xl">UEV</div>
              <div className="welcome-line-2 text-white text-lg mt-3 ">Password Recovery</div>
            </div>
            <div className='flex-grow h-[90px] mt-2 w-full'>
              <label htmlFor="email"
              className='text-sm ml-1'>Email:</label>
              <div className="form-inp bg-black/70 w-full">
                <input
                  type="email"
                  id="email"
                  placeholder='somemail@mail.com'
                  className="uppercase placeholder:normal-case px-5 py-3 bg-transparent border border-gray-300 w-full focus:border-green-500 outline-none"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className='text-sm w-full text-center'>
                {email && ( // Only show the message if email has some content
                  isEmailValid ? (
                    <span style={{ color: 'green' }}>Valid email address</span>
                  ) : (
                    <span style={{ color: 'red' }}>Input a valid email address</span>
                  )
                )}
              </div>
            </div>
          </div>
          <div className=''>
            <button
              type="submit"
              className={`submit-button w-full px-4 py-3 submit-button font-semibold rounded-lg text-sm transition-all ease-in-out duration-300 
                  ${isEmailValid ? 'text-green-500 bg-black/60 border border-green-500 hover:bg-green-500 hover:text-black hover:cursor-pointer ' : 'text-gray-500  outline outline-[1px] outline-gray-500 cursor-not-allowed'}`}
              disabled={!isEmailValid || isLoading}>
              {isLoading ? 'Sending...' : 'Send Password Recovery Email'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default PasswordRecovery;
