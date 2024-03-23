import React from "react";
import { Link } from "react-router-dom";
import { DatabaseIcon } from 'lucide-react';


const Navbar = () => {
  return (
    <header>
      <div className="flex p-4 text-2xl">
        <Link className='flex gap-2 font-semibold " href="#"'>  <DatabaseIcon className="w-8 h-8" /> CaseQL</Link>
        <nav className="ml-auto space-x-6 flex-1 text-center text-xl">
          <Link href="#">Brief</Link>
          <Link href="#">Query</Link>
          <Link href="#">Results</Link>
         
         
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
