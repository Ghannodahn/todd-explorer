import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Prototype from '../../prototypes/prototypes'

interface NavItem {
  label: string
  path: string | null
  children: NavItem[] | null
}

// Initial navigation structure with Home only
const initialNavItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
    children: null
  },
  {
    label: 'Prompty',
    path: '/prompty',
    children: null
  },
  {
    label: 'Prototypes',
    path: null,
    children: [] // Will be populated from prototypes.json
  }
]

const Header: React.FC = () => {
  // State for nav items that will be dynamically loaded
  const [navItems, setNavItems] = useState(initialNavItems)

  // Load prototypes from JSON file
  useEffect(() => {
    // Using fetch instead of dynamic import
    fetch('/data/prototypes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((prototypesData) => {
        // Update the Prototypes menu with data from JSON
        setNavItems((prevItems) =>
          prevItems.map((item) =>
            item.label === 'Prototypes'
              ? {
                  label: item.label,
                  path: item.path,
                  children: prototypesData.map((prototype: Prototype) => ({
                    label: prototype.title,
                    path: prototype.path,
                    children: null
                  }))
                }
              : item
          )
        )
      })
      .catch((error) => {
        console.error('Error loading prototypes:', error)
      })
  }, [])

  // Define common button styles for consistency
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `${
      isActive ? 'text-blue-600' : 'text-gray-700'
    } hover:text-blue-600 cursor-pointer`

  // State to track if dropdown is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Ref for the dropdown menu to detect outside clicks
  const dropdownRef = useRef<HTMLLIElement>(null)

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
      <div className="text-xl font-bold">
        <a href="/TODD/">TODD</a>
      </div>
      <nav>
        <ul className="flex space-x-4">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={item.children ? 'relative' : ''}
              ref={item.children ? dropdownRef : undefined}
            >
              {!item.children ? (
                <NavLink to={item.path || ''} className={navLinkStyle}>
                  {item.label}
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={toggleDropdown}
                    className={`flex cursor-pointer items-center text-gray-700 hover:text-blue-600`}
                  >
                    {item.label}
                    <svg
                      className={`ml-1 size-4 transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-40 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      {item.children?.map((child: NavItem, childIndex) => (
                        <NavLink
                          key={childIndex}
                          to={child.path || ''}
                          onClick={() => setIsDropdownOpen(false)}
                          className={({ isActive }) =>
                            `block w-full px-4 py-2 text-left text-sm ${
                              isActive
                                ? 'bg-gray-100 text-blue-600'
                                : 'text-gray-700'
                            } hover:bg-gray-100`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}{' '}
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
export default Header
