import { Delete } from 'lucide-react';
import React, { useState } from 'react';


const Query = () => {
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
          <button
            name='SELECT'
            className='bg-slate-950 text-gray-50 border rounded-md p-3'
            onClick={() => handleClick('SELECT')}
          >
            SELECT
          </button>
          <button
            name='WHERE'
            className='bg-slate-950 text-gray-50 border rounded-md p-3'
            onClick={() => handleClick('WHERE')}
          >
            WHERE
          </button>
          <button
            name='FROM'
            className='bg-slate-950 text-gray-50 border rounded-md p-3'
            onClick={() => handleClick('FROM')}
          >
            FROM
          </button>
          <button
            name='GROUP'
            className='bg-slate-950 text-gray-50 border rounded-md p-3'
            onClick={() => handleClick('GROUP')}
          >
            GROUP
          </button>
          <button
            name='BY'
            className='bg-slate-950 text-gray-50 border rounded-md p-3'
            onClick={() => handleClick('BY')}
          >
            BY
          </button>
        </div>
        <p className='max-w-[500px] font-semibold'>All illegal site's servers were seized in a recent operation. Please submit all the users' details</p>
      </div>
    </div>
  );
};

export default Query;
