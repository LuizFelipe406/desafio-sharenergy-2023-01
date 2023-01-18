import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import SideBar from '../components/SideBar';

function HttpCat () {
  const [statusCode, setStatusCode] = useState('');
  const [catImage, setCatImage] = useState('');

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setStatusCode(value);
  };

  const requestCat = () => {
    if (statusCode.length === 0) {
      setCatImage('https://http.cat/404')
    } else {
      setCatImage(`https://http.cat/${statusCode}`)
    }
    setStatusCode('');
  }

  return (
    <div className="bg-gradient-to-tr from-dcream to-cream font-plexSans">
      <SideBar />
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="h-11 flex items-center justify-center mb-5 w-96 ml-10">
          <input
            className="h-full px-4 w-full rounded-l-lg shadow-md focus:outline-none"
            onChange={ handleInputChange }
            value={ statusCode }
            placeholder="Digite um Status Code"
          />
          <button
            className="bg-green h-full px-3 rounded-r-lg shadow-md mr-8"
            type="button"
            onClick={requestCat}
          >
            {<BsSearch />}
          </button>
        </div>
        <img src={catImage} alt="cat image" className={`rounded-3xl h-2/6 md:h-3/6 mt-16 shadow-xl ${catImage.length === 0 ? 'invisible' : ''}`} />
      </div>
    </div>
  )
}

export default HttpCat;
