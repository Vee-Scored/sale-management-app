import React from 'react'
import { useRecordStore } from '../store/useRecordStore'
import RecordRow from './RecordRow';
import SkeletonLoader from './SkeletonRow';
import EmptyRow from './EmptyRow';

const RecordTable = () => {
  const {records} = useRecordStore();
  return (
    <div className="overflow-x-auto bg-white ">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-nowrap text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
             
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              records.length == 0 ? <EmptyRow columns={6} /> : records.map((product, index) => (
                <RecordRow key={index} index={index} product={product} />
              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default RecordTable