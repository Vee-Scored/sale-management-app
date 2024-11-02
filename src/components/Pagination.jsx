import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ from = "*", to = "*", total = "*", prev, next }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const nextBtnHandler = () => {
        const newUrl = new URL(next)
        setSearchParams(newUrl.search)
    }

    const prevBtnHandler = () => {
        const newUrl = new URL(prev);
        setSearchParams(newUrl.search)
    }
    return (
        <div className="flex  justify-between items-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold italic text-gray-900 dark:text-white">
              {from}
            </span>{" "}
            to{" "}
            <span className="font-semibold italic text-gray-900 dark:text-white">
              {to}
            </span>{" "}
            of{" "}
            <span className="font-semibold italic text-gray-900 dark:text-white">
              {total}
            </span>{" "}
            products
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              disabled={prev ? false : true}
              
              onClick={prevBtnHandler}
              className="flex items-center disabled:bg-blue-400 justify-center px-3 h-8 text-sm font-medium text-white bg-blue-600 rounded-s hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-gray-200 dark:hover:bg-blue-700 dark:hover:text-white"
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <button
              disabled={next ? false : true}
              onClick={nextBtnHandler}
              className="flex disabled:bg-blue-400 items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-600 rounded-e hover:bg-blue-900 dark:bg-blue-800 dark:border-blue-700 dark:text-gray-200 dark:hover:bg-blue-700 dark:hover:text-white"
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      );
}

export default Pagination