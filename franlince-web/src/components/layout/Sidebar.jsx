import { NavLink } from 'react-router-dom'
import {
  X,
  Upload,
  Grid3X3,
  BarChart3,
  Search,
  Settings
} from 'lucide-react'

const navigation = [
  { name: 'Catálogo', href: '/catalog', icon: Grid3X3 },
  { name: 'Subir Pinturas', href: '/upload', icon: Upload },
  { name: 'Búsqueda IA', href: '/search', icon: Search },
  { name: 'Estadísticas', href: '/stats', icon: BarChart3 },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-primary-800
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:z-20
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-primary-700">
          <div className="flex items-center">
            <img
              src="/logo-franlince.png"
              alt="Franlince Decoración"
              className="h-12 w-auto brightness-0 invert drop-shadow-sm"
            />
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                }
              `}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-700">
          <NavLink
            to="/settings"
            className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-primary-100 hover:bg-primary-700 hover:text-white"
          >
            <Settings className="h-5 w-5 mr-3" />
            Configuración
          </NavLink>

          <div className="mt-4 px-3 py-3 bg-primary-900 rounded-lg">
            <p className="text-xs text-primary-200 font-medium">Sistema de Catálogo</p>
            <p className="text-xs text-primary-300 mt-1">v1.0.0 - Franlince</p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
