import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [FormFilled, setFormFilled] = useState(false);
  const [passwordFilled, setpasswordFilled] = useState(false);
  const [RegistrationNumberFilled, setRegistrationNumberFilled] = useState(false);
  const [RegistrationNumber, setRegistrationNumber] = useState('');
  const [Password, setPassword] = useState('')
  const [PasswordVisible, setPasswordVisibility] = useState(false)

  const HandlePasswordVisibility = () => {
    setPasswordVisibility(!PasswordVisible)
  }

  useEffect(() => {
    setRegistrationNumberFilled(RegistrationNumber !== '');
    setpasswordFilled(Password !== '');
    setFormFilled(RegistrationNumberFilled && passwordFilled);
  }, [RegistrationNumber, Password]);

  return (
    <div className='w-full h-screen bg-[#163a16]  flex justify-center items-center'>
      <section className='bg-black/60 rounded-3xl max-w-[300px] w-[95%] h-[400px] p-5 '>
        <div className="">
          <form className="form">
            <div className=" relative right-0 left-0  w-[230px] mx-auto">
              <div className="welcome-lines text-center leading-tight">
                <div className="welcome-line-1 text-green-500 font-semibold text-4xl">UEV</div>
                <div className="welcome-line-2 text-white text-lg mt-3">Welcome Back</div>
              </div>
              <div className="input-area mt-10 space-y-5">
                <div className="form-inp bg-black/60">
                  <input
                    placeholder="Registration Number"
                    type="text"
                    value={RegistrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="uppercase placeholder:normal-case px-5 py-3 bg-transparent border border-gray-300 w-full focus:border-green-500 outline-none" />
                </div>
                <div className="form-inp flex justify-between bg-black/60">
                  <input
                    placeholder="Password"
                    type={PasswordVisible ? "text" : "password"}
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-5 py-3 bg-transparent border border-gray-300 w-full focus:border-green-500 outline-none" />
                  <div type='' onClick={HandlePasswordVisibility}>
                    <FontAwesomeIcon
                      icon={PasswordVisible ? faEye : faEyeSlash}
                      size="sm"
                      style={{ color: "#22c55e", marginLeft: 'auto' }} />
                  </div>
                </div>
              </div>
              <div className="submit-button-cvr mt-5">
                <button
                  disabled={!FormFilled}
                  type="submit"
                  className={`submit-button w-full px-4 py-3 submit-button font-semibold rounded-lg text-lg transition-all ease-in-out duration-300
                  ${FormFilled ? 'text-green-500 bg-black/60 border border-green-500 hover:bg-green-500 hover:text-black hover:cursor-pointer ' : 'text-gray-500  outline outline-[1px] outline-gray-500 cursor-not-allowed'}`}
                >
                  Login
                </button>
              </div>
              <div className="forgot-pass text-center mt-6">
                <Link to="/PasswordRecovery" className="text-gray-500 text-sm no-underline hover:text-gray-300">Forgot password?</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
