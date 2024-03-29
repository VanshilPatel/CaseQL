import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Brief from './components/Brief'
import Query from './components/Query'
import Results from './components/Results'
import Signup from './components/Signup'
import Login from './components/Login'




function App() {


  return (
    <div className='bg-gray-950 text-gray-50'>
    
    <BrowserRouter>
    <Navbar/>
    <div className="flex flex-col min-h-screen">
          <Routes>
            
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<Home className="h-screen pt-20" />} />
            <Route path='/brief' element={<Brief />} />
            <Route path='/query' element={<Query />} />
            <Route path='/results' element={<Results />} />
          </Routes>
        </div>
   
    </BrowserRouter>
    </div>
  )
}

export default App
