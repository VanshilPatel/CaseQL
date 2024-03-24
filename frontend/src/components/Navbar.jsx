import React from "react";
import { Link } from "react-router-dom";
import { DatabaseIcon } from 'lucide-react';



const Navbar = () => {
  return (
    <header className="pt-4">
      <div className="flex p-4 text-xl">
        <Link className='flex gap-2 font-semibold' to="/">  <DatabaseIcon className="w-8 h-8" /> CaseQL</Link>
        <nav className="ml-9 space-x-11 flex-1 text-center text-xl">
          <Link to="/brief" className="nav-link">Brief</Link>
          <Link to="/query" className="nav-link">Query</Link>
          <Link to="/results" className="nav-link">Results</Link>
          
        </nav>
        <Link to="/signup" className="border rounded-md bg-slate-50 px-2 mx-3 text-gray-950">Sign Up</Link>
        <Link to="/login" className="border rounded-md bg-slate-50 px-2 mx-3 text-gray-950">Login</Link>
      </div>
    </header>
  );
};

export default Navbar;
