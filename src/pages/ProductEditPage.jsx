import React from 'react'
import ProductCreateForm from '../components/ProductCreateForm'
import ProductEditForm from '../components/ProductEditForm'
import Breadcrumb from '../components/BreadCrumb'

const ProductEditPage = () => {
  return (
    <div>
        <Breadcrumb/>
        <ProductEditForm/>
    </div>
  )
}

export default ProductEditPage