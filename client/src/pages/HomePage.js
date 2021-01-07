import React, { useContext, useState } from 'react';
import Tour from 'reactour';

import AuthContext from '../components/AuthContext';
import Hero from '../components/Hero';
import BlogPosts from '../components/BlogPosts';
import AddButton from '../components/AddButton';

const HomePage = () => {
  const auth = useContext(AuthContext);
  const [isTourOpen, setIsTourOpen] = useState(
    auth.user.admin && !localStorage.getItem('old')
  );

  auth.user.admin && localStorage.setItem('old', 1);

  const steps = [
    {
      selector: '.add-button',
      content: 'از اینجا یک پست اضافه کنید.',
    },
  ];

  return (
    <div className="container">
      <Hero
        title="وبلاگ من"
        description="یک وبلاگ بسیار مفید و غیر مفید برای شما."
      />
      <BlogPosts />

      {auth.user.admin && (
        <>
          <Tour
            steps={steps}
            isOpen={isTourOpen}
            onRequestClose={() => setIsTourOpen(false)}
          />
          <AddButton />
        </>
      )}
    </div>
  );
};

export default HomePage;
