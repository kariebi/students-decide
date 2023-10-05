import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Steps = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div data-aos="fade-up" className='container mx-auto mt-8 text-primary'>
      <h1 className='text-3xl w-full text-center font-semibold mb-4'>Voting Steps</h1>
      <div data-aos="fade-up" className='flex flex-col md:flex-row md:gap-8 px-2'>
        <div className='flex-grow'>
          <div data-aos="fade-up" className='mb-4'>
            <h2 data-aos="fade-up" className='text-xl font-semibold mb-2'>Step 1: Register</h2>
            <p>
              To participate in the Student Dictates, make sure you are registered as a student voter.
            </p>
          </div>
          <div data-aos="fade-up" className='mb-4'>
            <h2 className='text-xl font-semibold mb-2'>Step 2: Verify Eligibility</h2>
            <p>
              Verify your eligibility to vote. Ensure that you meet all the criteria
              to participate in the election.
            </p>
          </div>
        </div>
        <div data-aos="fade-up" className='flex-grow'>
          <div data-aos="fade-up" className='mb-4'>
            <h2 className='text-xl font-semibold mb-2'>Step 3: Explore Candidates</h2>
            <p>
              Take some time to explore information about the candidates. Learn about
              their platforms, goals, and why they are running for office.
            </p>
          </div>
          <div data-aos="fade-up" className='mb-4'>
            <h2 className='text-xl font-semibold mb-2'>Step 4: Cast Your Vote</h2>
            <p>
              When you are ready, visit the voting page and cast your vote for your
              preferred candidates. Make your voice heard!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
