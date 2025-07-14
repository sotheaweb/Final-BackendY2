import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-sky-600 w-full px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-blue-50 font-bold text-2xl">
          <NavLink to="/">Track App</NavLink>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Menu */}
        <ul
          className={`flex-col md:flex-row md:flex gap-6 items-center absolute md:static left-0 top-16 md:top-0 w-full md:w-auto bg-sky-600 md:bg-transparent z-50 transition-all duration-300 ease-in ${
            isOpen ? 'flex' : 'hidden'
          }`}
        >
          {/* Nav Links */}
          {[
            { name: 'Home', to: '/' },
            { name: 'Add Content', to: '/add-cotent' },
            { name: 'Show Content', to: '/show-cotent' },
            { name: 'Search', to: '/search' },
            { name: 'Login', to: '/signin' },
            { name: 'Analysist', to: '/analyst' },
          ].map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `relative px-2 py-1 text-white font-sans
                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300
                  ${isActive ? 'after:w-full text-gray-300 font-medium' : 'after:w-0 hover:after:w-full'}`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
