import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about">
      <h3>About </h3>
      <Button color="#ccc" text="Go Back" onClick={() => navigate(-1)} />
    </div>
  );
};

export default About;
