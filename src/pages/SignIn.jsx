import React from 'react';

const SignIn = () => {
  return (
    <div className='w-full flex justify-center'>
      <section className='bg-black rounded-3xl sm:max-w-[300px] w-[95%] h-[400px] p-5 shadow-lg outline-[1px solid #2b9962]'>
        <div className="">
          <form className="form">
            <div className=" relative right-0 left-0  w-[230px] mx-auto">
              <div className="welcome-lines text-center leading-tight">
                <div className="welcome-line-1 text-green-500 font-semibold text-4xl">UEV</div>
                <div className="welcome-line-2 text-white text-lg mt-3">Welcome Back</div>
              </div>
              <div className="input-area mt-10 space-y-5">
                <div className="form-inp">
                  <input placeholder="Registration Number" type="text" className="px-5 py-3 bg-transparent border border-gray-300 w-full focus:border-green-500 outline-none"/>
                </div>
                <div className="form-inp">
                  <input placeholder="Password" type="password" className="px-5 py-3 bg-transparent border border-gray-300  w-full focus:border-green-500 outline-none"/>
                </div>
              </div>
              <div className="submit-button-cvr mt-5">
                <button type="submit" className="submit-button w-full px-4 py-3 text-green-500 bg-transparent font-semibold rounded-lg text-lg border outline-[1px solid #00FF7F] transition-all ease-in-out duration-300 hover:bg-green-500 hover:text-gray-100 hover:cursor-pointer">
                  Login
                </button>
              </div>
              <div className="forgot-pass text-center mt-3">
                <a href="#" className="text-gray-600 text-sm no-underline hover:text-gray-400">Forgot password?</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
