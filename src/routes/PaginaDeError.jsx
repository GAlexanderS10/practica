import React from 'react';
import "../styles/PaginaError.css"
import ImgError from '../assets/error.jpg'

const PaginaDeError = () => {
  return (
    <div className="error-container">
      <div className="image-container">
        <img src={ImgError} id="img-error" />
      </div>
    </div>
  );
};

export default PaginaDeError;
