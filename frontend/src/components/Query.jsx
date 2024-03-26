import { Delete } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Query = () => {
  const symbols = ["*", ">", "<", "=", "!=", "NOT", "AND", "OR", "DISTINCT", "LIMIT", "IN"];
  const keywords = ["SELECT", "WHERE", "FROM", "GROUP", "BY"];
  const keywords2 = ["firstName", "lastName", "emailAdd", "posts", "answer"];
  const numbers = ["0","1","2","3","4","5","6","7","8","9","0",] 
  const [id, setId] = useState(5); 
  const [value, setValue] = useState(' ');
  const [brief, setBrief] = useState();
  const navigate = useNavigate();

  const requestBody = {
    id: id.toString(), 
    value: value.toString(),
  };

  const executeQuery = ()=>{

    axios.post('http://localhost:5342/query', requestBody)
      .then(function (response) {

        if(response.data.message == "success"){
          navigate('/results')
        }
        navigate('/results')
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
   

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
        <button onClick={executeQuery} className='bg-slate-950 text-gray-50 border rounded-md p-3 w-1/12'>Execute</button>
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
        <p className='max-w-[400px] font-semibold'>{brief}</p>
        <div className='mt-5 flex flex-wrap space-x-4 my-2'>
        {symbols.map(symbol => <buttton 
        name={symbol} 
        onClick={() => handleClick(symbol)}
        className="bg-slate-950 text-gray-50 border rounded-md p-3 my-3">{symbol}</buttton>)}
        </div>
        <div className='flex flex-wrap space-x-1 my-2'>
        {numbers.map(number => <buttton 
        name={number} 
        onClick={() => handleClick(number)}
        className="bg-slate-950 text-gray-50 border rounded-md p-2 my-3">{number}</buttton>)}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Query;
