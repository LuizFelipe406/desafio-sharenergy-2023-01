import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import SideBar from "../components/SideBar";

function RandomDog() {
  const [dogImg, setDogImg] = useState('');

   useEffect(() => {
    const request = async () => {
      const { data } = await axios.get('https://random.dog/woof.json?include=jpg');
      setDogImg(data.url);
      console.log(data.url)
    };
    request();
   }, []);

   const getNewDog = async () => {
    const { data } = await axios.get('https://random.dog/woof.json?include=jpg,jpeg');
    setDogImg(data.url);
    console.log(data.url)
   }

  return (
    <div className="bg-gradient-to-tr from-dcream to-cream font-plexSans">
      <SideBar />
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <img src={dogImg} alt="dog image" className="rounded-3xl h-3/6 mb-16 shadow-xl"  />
        <button
          className="bg-green px-3 py-2 rounded-lg shadow-md text-white text-2xl"
          type="button"
          onClick={ getNewDog }
        >
          { <AiOutlineReload /> }
        </button>
      </div>
    </div>
  )
}

export default RandomDog;
