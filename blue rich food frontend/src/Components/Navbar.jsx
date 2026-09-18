
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          BlueRich<span className="text-green-500">Food</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="hover:text-green-500">
            Home
          </Link>

          <Link to="/menu" className="hover:text-green-500">
            Menu
          </Link>

          <Link to="/aichat" className="hover:text-green-500">
            AI Assistant
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 hover:bg-gray-800 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-800 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            <Link to="/" className="hover:text-green-500" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link to="/menu" className="hover:text-green-500" onClick={() => setIsOpen(false)}>
              Menu
            </Link>

            <Link to="/aichat" className="hover:text-green-500" onClick={() => setIsOpen(false)}>
              AI Assistant
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
