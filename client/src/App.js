import React, { useState } from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IconContext } from 'react-icons';

function App() {

  const [CompanyName , setCompanyName] = useState("")
  const [dataValue , setDataValue] = useState()
  const [result , setResult] = useState("")

  const handleInputChange = (event) => {
    setCompanyName(event.target.value.toUpperCase())
  }
  
  async function getCompanyInfo() {
    setResult(CompanyName)
    const apiUrl = `http://localhost:5000/company/${CompanyName}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('API request failed man');
      }
      
      const data = await response.json();
      setDataValue(data)
    } catch (error) {
      console.error('Error:', error.message);
    }
  }


  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center">

      <div className='flex flex-col'>
        
        <input className='h-8 p-2' onChange={(e)=> handleInputChange(e)}></input>
        <button className={`text-white mt-4 bg-emerald-700 h-8 ${!CompanyName && 'opacity-50 cursor-not-allowed'}`} onClick={getCompanyInfo} disabled={!CompanyName}>Check</button>

        {dataValue === false && (
  <IconContext.Provider value={{ color: "green", className: "global-class-name", size: "2em" }}>
    <div className='mt-3 flex'>
      <FaRegCircleCheck />
      <div className='text-white ml-2 mt-1'>CONGRATULATIONS! {result} IS AVAILABLE</div>
    </div>
  </IconContext.Provider>
)}

      {dataValue === true && (
  <div>
      <IconContext.Provider value={{ color: "red", className: "global-class-name", size: "2em" }}>
    <div className='mt-3 flex'>
      <FaRegCircleXmark />
      <div className='text-white ml-2 mt-1'>SORRY! {result} IS NOT AVAILABLE</div>
    </div>
  </IconContext.Provider>
  </div>
)}
      </div>
        
    </div>
  );
}

export default App;
