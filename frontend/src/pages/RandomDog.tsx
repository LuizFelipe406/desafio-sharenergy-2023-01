import axios from "axios";
import React, { useEffect, useState } from "react";
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
    <div>
      <SideBar />
      <div className="h-screen w-screen flex items-center justify-center">
        <img src={dogImg} alt="dog image" />
        <button
          type="button"
          onClick={ getNewDog }
        >
          refresh
        </button>
      </div>
    </div>
  )
}

export default RandomDog;
