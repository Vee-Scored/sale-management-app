import React from 'react'
import ProductTable from '../components/ProductTable'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/BreadCrumb'

const ProductListPage = () => {
  const nav  = useNavigate()
  return (
    <div>
      <Breadcrumb/>
      <ProductTable/>
    </div>
  )
}

export default ProductListPage