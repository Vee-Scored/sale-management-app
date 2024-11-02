'use client'

import React, { useState, useEffect, useRef } from 'react'

// Sample product data
const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Smartphone' },
  { id: 3, name: 'Tablet' },
  { id: 4, name: 'Headphones' },
  { id: 5, name: 'Smartwatch' },
]

export default function ComboBox() {
  const [inputValue, setInputValue] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target) && 
          listRef.current && !listRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    setIsOpen(true)

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredProducts(filtered)
  }

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setInputValue(product.name)
    setIsOpen(false)
  }

  return (
    <div className="relative w-64">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder="Search products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isOpen && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredProducts.map(product => (
            <li
              key={product.id}
              onClick={() => handleSelectProduct(product)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {product.name}
            </li>
          ))}
          {filteredProducts.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No products found</li>
          )}
        </ul>
      )}
      {selectedProduct && (
        <p className="mt-2 text-sm text-gray-600">
          Selected: {selectedProduct.name}
        </p>
      )}
    </div>
  )
}