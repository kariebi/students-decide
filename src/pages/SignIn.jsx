import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

import usePersist from '../hooks/usePersist'
import { setCredentials } from '../tools/auth/authSlice'
import { useLoginMutation } from '../tools/auth/authApiSlice'

import useTitle from '../hooks/useTitle'

const SignIn = () => {
  useTitle("Student Login");

  const [FormFilled, setFormFilled] = useState(false);
  const [passwordFilled, setpasswordFilled] = useState(false);
  const [RegistrationNumberFilled, setRegistrationNumberFilled] = useState(false);
  const [RegistrationNumber, setRegistrationNumber] = useState('');
  const [Password, setPassword] = useState('')
  const [PasswordVisible, setPasswordVisibility] = useState(false)
  const [persist, setPersist] = usePersist()
  const userRef = useRef()
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const HandlePasswordVisibility = () => {
    setPasswordVisibility(!PasswordVisible)
  }

  const handleToggle = () => setPersist(prev => !prev)

  const AttemptLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await login({ RegistrationNumber, Password }).unwrap()
      // dispatch(setCredentials({ accessToken }))
      console.log(response.data)
      setRegistrationNumber('') // Clear the fields
      setPassword('')
      setErrMsg('') // Clear any previous error messages
      navigate('/userdashboard')
    } catch (err) {
      console.error(err);
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
      // errRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    setRegistrationNumberFilled(RegistrationNumber !== '');
    setpasswordFilled(Password !== '');
    setFormFilled(RegistrationNumberFilled && passwordFilled);
  }, [RegistrationNumber, Password]);

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const errClass = errMsg ? "block text-red-500 text-sm mt-2" : "block"



  return (
    <div className='w-full h-screen bg-BaseBackground  flex justify-center items-center'>
      <section className='bg-black/70 rounded-3xl max-w-[300px] w-[95%] min-h-[400px] p-5 '>
        <div className="">
          <form className="form" onSubmit={AttemptLogin}>
            <div className=" relative right-0 left-0  w-[230px] mx-auto">
              <div className="welcome-lines text-center leading-tight">
                <div className="welcome-line-1 text-green-500 font-semibold text-4xl">UEV</div>
                <div className="welcome-line-2 text-white text-lg mt-3">Welcome Back</div>
                <div className={errClass} ref={errRef} aria-live="assertive">
                  {errMsg}
                </div>
              </div>
              <div className="input-area mt-10 space-y-5">
                <div className="form-inp bg-black/70">
                  <input
                    placeholder="Registration Number"
                    type="text"
                    id="RegistrationNumber"
                    value={RegistrationNumber}
                    ref={userRef}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="uppercase placeholder:normal-case px-5 py-3 bg-transparent border border-gray-300 w-full focus:border-green-500 outline-none"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-inp flex justify-between bg-black/70">
                  <input
                    placeholder="Password"
                    type={PasswordVisible ? "text" : "password"}
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="Password"
                    className="px-5 py-3 bg-transparent border border-gray-300 w-full focus:border-green-500 outline-none"
                    autoComplete="off"
                    required
                  />
                  <div type='' onClick={HandlePasswordVisibility}>
                    <FontAwesomeIcon
                      icon={PasswordVisible ? faEye : faEyeSlash}
                      size="sm"
                      style={{ color: "#22c55e", marginLeft: 'auto' }} />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                {isLoading &&
                  <div className='w-full justify-center mb-4 flex h-full'>
                    <PulseLoader size={5} color={"#fff"} />
                  </div>
                }
                <button
                  disabled={!FormFilled}
                  className={`submit-button w-full px-4 py-3 submit-button font-semibold rounded-lg text-lg transition-all ease-in-out duration-300
                  ${FormFilled ? 'text-green-500 bg-black/60 border border-green-500 hover:bg-green-500 hover:text-black hover:cursor-pointer ' : 'text-gray-500  outline outline-[1px] outline-gray-500 cursor-not-allowed'}`}
                >
                  Login
                </button>
              </div>
              <div>
                <label htmlFor="persist" className="w-full  flex justify-center mt-3">
                  <input
                    type="checkbox"
                    className=""
                    id="persist"
                    onChange={handleToggle}
                    checked={persist}
                  />
                  <p
                    className='text-gray-500 ml-2 text-sm'
                  >
                    Trust This Device
                  </p>
                </label>
              </div>
              <div className="text-center mt-2">
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
