import React, { useState } from 'react';

function App() {

  const [CompanyName , setCompanyName] = useState("")

  const handleInputChange = (event) => {
    setCompanyName(event.target.value)
  }

  

  async function getCompanyInfo() {
    const apiUrl = `http://localhost:5000/company/${CompanyName}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('API request failed man');
      }
  
      const data = await response.json();
      console.log('Company Info:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  

  return (
    <div className="bg-[#252525] h-screen flex justify-center">

      <div className='flex flex-col mt-48'>
        
        <input className='h-8 p-2' onChange={(e)=> handleInputChange(e)}></input>
        <button className="text-white mt-4" onClick={getCompanyInfo}>Company info</button>
        
      </div>
        
    </div>
  );
}

export default App;
