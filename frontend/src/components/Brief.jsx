import React from 'react'
import { useNavigate } from 'react-router-dom';

const Brief = () => {

   const navigate = useNavigate();

   const handleClick = ()=>{
    navigate('/query')
   }


     return (
    <div className="flex flex-col items-center min-h-screen gap-y-4 mt-44"> 
    <h1 className='font-extrabold text-2xl'>Mission Brief</h1>
    <p className='max-w-[600px] font-semibold '>All illegal site's servers were seized in a recent operation. Please submit all the users' details</p>
    <h2 className='mt-7'>Use SQL to retrieve the data and submit the resulting table</h2>
    <button className='border rounded-md bg-slate-500 p-3' onClick={handleClick}>Continue</button>
  </div>
  )
}

export default Brief
