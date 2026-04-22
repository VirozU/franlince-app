import { Link } from 'react-router-dom'
import { Menu, Search, Bell } from 'lucide-react'

function Navbar({ onMenuClick }) {
  return (
    <nav className="bg-[#0F2E1C] border-b border-[#0a1f13] fixed w-full z-30 lg:pl-64">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-green-200 hover:text-white hover:bg-[#1a4a2e]"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link to="/" className="lg:hidden ml-2 flex items-center">
              <img
                src="/logo-franlince.png"
                alt="Franlince Decoración"
                className="h-9 w-auto brightness-0 invert drop-shadow-sm"
              />
            </Link>
          </div>

          

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-green-200 hover:text-white hover:bg-[#1a4a2e] relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
              F
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
