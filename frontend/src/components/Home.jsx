import React from 'react'

const Home = () => {
  return (
    
    <div className="space-y-4 text-center mt-36">
            <h1 className="text-7xl font-bold text-blue-400 ">
              Practice SQL with CaseQL
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-50 text-2xl gap-3">
              The best way to learn SQL is by practicing. Solve cases, write queries, and check your results.
            </p>

            <div className='space-x-7 space-y-4'>
                <button className='border rounded-md bg-slate-50 text-gray-900 p-3'>Sign Up</button>
                <button className='border rounded-md bg-gray-700 text-gray-50 p-3'>Try a few cases</button>
            </div>

    </div>
         
  )
}

export default Home
