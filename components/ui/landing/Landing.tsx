import React from 'react';
import Hero from './Hero';
import Feature from './Feature';
import Pricing from './Pricing';
import ContactForm from '../ContactForm';
import GoToTop from '../GoToTop';
const Landing = () => {
  return (
    <>
      <Hero />
      <Feature />
      <Pricing />
      <ContactForm />
      <GoToTop />
    </>
  );
};

export default Landing;
