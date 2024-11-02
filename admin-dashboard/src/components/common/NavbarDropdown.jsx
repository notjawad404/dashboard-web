import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NavbarDropdown () {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-5 h-5 rounded-full"
      >
        <FaAngleDown size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg w-48">
          <ul className="py-1">
            <li>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Option 1
              </Link>
            </li>
            <li>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Option 2
              </Link>
            </li>
            <li>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Option 3
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

