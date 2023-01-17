import React, { useState } from 'react';
import SideBar from '../components/SideBar';

function HttpCat () {
  const [statusCode, setStatusCode] = useState('0');
  const [catImage, setCatImage] = useState('');

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setStatusCode(value);
  };

  const requestCat = () => {
    setCatImage(`https://http.cat/${statusCode}`)
  }

  return (
    <div>
      <SideBar />
      <div className="flex items-center w-screen justify-center">
        <img src={catImage} alt="cat image" />
        <input
          type="number"
          onChange={ handleInputChange }
          value={ statusCode }
          placeholder="Digite um Status Code"
        />
        <button
          type="button"
          onClick={requestCat}
        >
          pesquisar
        </button>
      </div>
    </div>
  )
}

export default HttpCat;
