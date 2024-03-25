import { Delete } from 'lucide-react';
import React, { useState } from 'react';


const Query = () => {
  const symbols = ["*", ">", "<", "=", "!=", "NOT", "AND", "OR", "DISTINCT", "LIMIT", "IN"];
  const keywords = ["SELECT", "WHERE", "FROM", "GROUP", "BY"];
  const keywords2 = ["firstName", "lastName", "emailAdd", "posts", "lastAccess"];  

  const [value, setValue] = useState(' ');

  const handleClick = (buttonName) => {
    setValue((prevValue) => prevValue ? `${prevValue} ${buttonName}` : buttonName);
  };

  const handleDelete = () => {
   setValue((prevValue)=>{
   var words = prevValue.split(" ");
   words.pop();
   return words.join(" ")

   })
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <input
          type='text'
          className='bg-gray-800 w-[700px] h-96 ml-96 mt-4 pl-4 pt-2 text-left'
          readOnly
          value={value ?? ' '}   //value should be always string, can;t happen like prev it can be undefined or null and afterwards string come
        />
      </div>

      <div className='flex mt-3 ml-96 space-x-3'>
        <button className='bg-slate-950 text-gray-50 border rounded-md p-3 w-1/12 mr-3'  onClick={() => handleClick(';')}>;</button> 
        <button className='bg-slate-950 text-gray-50 border rounded-md p-3 w-1/12'>Execute</button>
        <button className='bg-slate-950 text-gray-50  p-3 w-1/12' onClick={handleDelete}><Delete/></button>
        
      </div>

      <div className='flex space-x-8 items-center'>
        <div className='flex flex-col w-1/12 justify-end ml-96 mt-3'>
            {keywords.map(keyword => <button
            name={keyword}
            className='bg-slate-950 text-gray-50 border rounded-md p-3'
            onClick={() => handleClick(keyword)}
          >
          { keyword}
          </button>)}     
        </div>

        <div className='flex flex-col w-1/12 justify-end ml-96 mt-3'>
        {keywords2.map(keyword => <button
            name={keyword}
            className='bg-slate-950 text-gray-50 border rounded-md p-3'
            onClick={() => handleClick(keyword)}
          >
          { keyword}
          </button>)}  
        </div>


        <div className='flex flex-col w-[400px]'>
        <p className='max-w-[400px] font-semibold'>All illegal site's servers were seized in a recent operation. Please submit all the users' details</p>
        <div className='mt-7 flex flex-wrap space-x-4 my-2'>
        {symbols.map(symbol => <buttton 
        name={symbol} 
        onClick={() => handleClick(symbol)}
        className="bg-slate-950 text-gray-50 border rounded-md p-3 my-3">{symbol}</buttton>)}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Query;
