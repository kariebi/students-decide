import React from 'react';

const About = () => {
  return (
    <div className='container mx-auto mt-8 mb-8 text-primary'>
      <h1 className='text-3xl font-semibold w-full text-center mb-4'>About Student Dictates</h1>
      <p className='mb-4'>
        Welcome to Student Dictates, the platform designed to empower students by giving them a voice
        in the decision-making process. Our mission is to promote transparency, democracy, and active
        participation in student elections.
      </p>
      <p className='mb-4'>
        <strong>Key Features:</strong>
      </p>
      <ul className='list-disc pl-6 mb-4'>
        <li>Secure and Transparent Voting Process</li>
        <li>Access to Candidate Information</li>
        <li>Real-time Election Monitoring</li>
      </ul>
      <p className='mb-4'>
        At Student Dictates, we believe in the power of student voices to shape the future. Whether
        you are a candidate running for office or a student voter, this platform is designed to
        facilitate a fair and accessible election process.
      </p>
      <p>
        Thank you for being a part of Student Dictates!
      </p>
    </div>
  );
};

export default About;
