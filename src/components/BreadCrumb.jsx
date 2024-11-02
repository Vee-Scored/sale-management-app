import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

const Breadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <nav aria-label="Breadcrumb" className="bg-white shadow px-5 py-3 rounded-lg">
      <ol className="flex items-center space-x-1 md:space-x-3">
        <li className="flex items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 inline-flex items-center"
          >
            <HomeIcon className="w-5 h-5 mr-2.5" />
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1

          return (
            <li key={name} className="flex items-center">
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              <Link
                
                className={`ml-1 pointer-events-none md:ml-2 text-sm font-medium ${
                  isLast
                    ? 'text-blue-600 cursor-default pointer-events-none'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                aria-current={isLast ? 'page' : undefined}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb