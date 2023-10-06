import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div data-aos="fade-up" className='container mx-auto px-2 mt-8 mb-8 text-black about-container'>
      <h1 className='text-3xl font-semibold w-full text-center mb-4 text-primary'>About Students Decide</h1>
      <p className='mb-4'>
        Welcome to <span className="text-primary">Students Decide</span>, the platform designed to empower students by giving them a voice
        in the decision-making process. Our mission is to promote transparency, democracy, and active
        participation in student elections.
      </p>
      <p className='mb-4 text-primary'>
        <strong>Key Features:</strong>
      </p>
      <ul className='list-disc pl-6 mb-4'>
        <li>Secure and Transparent Voting Process</li>
        <li>Access to Candidate Information</li>
        <li>Real-time Election Monitoring</li>
      </ul>
      <p className='mb-4'>
        At <span className="text-primary">Students Decide</span>, we believe in the power of student voices to shape the future. Whether
        you are a candidate running for office or a student voter, this platform is designed to
        facilitate a fair and accessible election process.
      </p>
      <p>
        Thank you for being a part of <span className="text-primary">Students Decide!</span>
      </p>
    </div>
  );
};

export default About;
