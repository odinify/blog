import React from 'react';

const Hero = ({ title, description }) => (
  <div className="hero">
    <div className="hero__content">
      <h1 className="hero__title">{title}</h1>
      <p className="hero__description">{description}</p>
    </div>
  </div>
);

export default Hero;
