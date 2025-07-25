import React from 'react'

const Loader = ({ className = '' }) => {
  return (
    <div className={`inline-block border-4 border-gray-200 border-t-blue-500 rounded-full ${className}`}></div>
  )
}

export default Loader