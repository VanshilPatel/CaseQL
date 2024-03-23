import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Brief from './components/Brief'
import Query from './components/Query'
import Results from './components/Results'



function App() {


  return (
    <div className='bg-gray-950 text-gray-50'>
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/brief' element={<Brief />}></Route>
      <Route path='/query' element={<Query/>}></Route>
      <Route path='/results' element={<Results/>}></Route>
     
    </Routes>
   
    </BrowserRouter>
    </div>
  )
}

export default App
