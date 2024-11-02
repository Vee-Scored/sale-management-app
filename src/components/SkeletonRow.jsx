import React from 'react'

const SkeletonLoader = ({ columns, className = '' }) => {
  return (
    <tr className={`animate-pulse ${className}`}>
      {[...Array(columns)].map((_, index) => (
        <td key={index} className="px-4 py-3 border-b border-gray-200">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </td>
      ))}
    </tr>
  )
}

export default SkeletonLoader