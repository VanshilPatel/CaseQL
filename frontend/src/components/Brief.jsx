import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Brief = () => {
   
   const [brief, setBrief] = useState();
   const navigate = useNavigate();

   var config = {
    method: 'get',
    url: 'http://localhost:5342/brief/5',
    headers: { 
      'Content-Type': 'application/json'
    },
  };
  
  axios(config)
  .then(function (response) {
   setBrief(response.data.description)
  })
  .catch(function (error) {
    console.log(error);
  });
  

   const handleClick = ()=>{
    navigate('/query')
   }


     return (
    <div className="flex flex-col items-center min-h-screen gap-y-4 mt-44"> 
    <h1 className='font-extrabold text-2xl'>Mission Brief</h1>
    <p className='max-w-[600px] font-semibold '>{brief}</p>
    <h2 className='mt-7'>Use SQL to retrieve the data and submit the resulting table</h2>
    <button className='border rounded-md bg-slate-500 p-3' onClick={handleClick}>Continue</button>
  </div>
  )
}

export default Brief
