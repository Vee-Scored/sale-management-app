import { PencilIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { useRecordStore } from '../store/useRecordStore'

const RecordRow = ({product,index}) => {
    const {removeRecord,records} = useRecordStore();

    const deleteBtnHandler = () => {
      
        removeRecord(product.product_id)
    }
  return (
    <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {index + 1}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {product.product.product_name}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
      {product.product.price} MMK
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
      {product.quantity}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
      {product.cost} MMK
    </td>
    
    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
      
      <button
        className="text-red-600 hover:text-red-900"
        onClick={() => deleteBtnHandler()}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </td>
  </tr>
  )
}

export default RecordRow