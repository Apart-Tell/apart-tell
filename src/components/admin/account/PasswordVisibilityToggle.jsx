import React, { useState } from 'react';
import eyeIcon from '../../../assets/svg/eye.svg';
import eyeHideIcon from '../../../assets/svg/eye-hide.svg';

const PasswordVisibilityToggle = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    onToggle(!showPassword); // Pass the updated showPassword value to the parent component
  };

  return (
    <span onClick={togglePasswordVisibility}>
      {showPassword ? (
        <img src={eyeHideIcon} alt="hide password" />
      ) : (
        <img src={eyeIcon} alt="show password" />
      )}
    </span>
  );
};

export default PasswordVisibilityToggle;
