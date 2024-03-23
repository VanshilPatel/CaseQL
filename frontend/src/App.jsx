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
    <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path='/home' element={<Home className="h-screen pt-20" />} />
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
