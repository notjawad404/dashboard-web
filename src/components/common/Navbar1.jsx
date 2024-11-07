import { AiOutlineSearch } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import NavbarDropdown from './NavbarDropdown';

export default function Navbar1() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
 <div className="flex items-center space-x-2">
      <AiOutlineSearch className="text-gray-500 h-5 w-5" />
      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 rounded-lg w-full outline-none border-none"
      />
    </div>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1.5">9</span>
          <FaBell size={30} color="blue" />
        </button>
        <div className="flex items-center">
          <img src="https://easydrawingguides.com/wp-content/uploads/2022/01/how-to-draw-a-cartoon-woman-featured-image-1200-801x1024.png" alt="Profile" className="w-10 h-10 rounded-full object-fit" />
          <span className="mx-2">Moni Roy <br /><small className="text-gray-500">Admin</small></span>
          <NavbarDropdown/>
        </div>
      </div>
    </nav>
  )
}
