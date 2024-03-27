// LottieAnimation.jsx
import React from 'react';
import Lottie from 'lottie-react';

const Animation = ({ animationData }) => {
  return (

    <Lottie
      animationData={animationData}
      loop={false}
      autoplay={true}
      style={{ width: '200px', height: '200px' }} // Adjust the size as needed
    />
  );
};

export default Animation;
