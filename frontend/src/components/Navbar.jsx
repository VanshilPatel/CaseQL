import React from "react";
import { Link } from "react-router-dom";
import { DatabaseIcon } from 'lucide-react';



const Navbar = () => {
  return (
    <header className="pt-4">
      <div className="flex p-4 text-2xl">
        <Link className='flex gap-2 font-semibold' to="/">  <DatabaseIcon className="w-8 h-8" /> CaseQL</Link>
        <nav className="ml-11 space-x-4 flex-1 text-center text-xl">
          <Link to="/brief" className="nav-link">Brief</Link>
          <Link to="/query" className="nav-link">Query</Link>
          <Link to="/results" className="nav-link">Results</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
