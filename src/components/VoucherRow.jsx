import { FileTextIcon, MenuIcon, PaperclipIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const VoucherRow = ({index,info:{id,customer_name,customer_email, sale_date,voucher_id},start}) => {
  const nav = useNavigate()
  const voucherLinkHandler = () => {
    nav(`/dashboard/voucher/card/${id}`)
  }
  return (
    <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
     {index + start}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {voucher_id}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {customer_name}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500">
      {customer_email} 
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
      {sale_date}
    </td>
    
    
    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
      
      <button
        className="text-blue-600 hover:text-blue-900"
        onClick={() => voucherLinkHandler()}
      >
        <FileTextIcon className="h-5 w-5" />
      </button>
    </td>
  </tr>
  )
}

export default VoucherRow