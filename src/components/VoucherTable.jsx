import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios";
import VoucherRow from "./VoucherRow";
import toast from "react-hot-toast";
import SkeletonLoader from "./SkeletonRow";
import EmptyRow from "./EmptyRow";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);
   const [isFetching, setIsFetching] = useState(false)
   
   const [metaData, setMetaData] = useState({})
   const [links,setLinks] = useState({})
   const {search}  = useLocation();
   const [param,setParam] = useSearchParams();
  const fetchVoucher = async () => {
    setIsFetching(true)
    const res = await axiosInstance.get("/vouchers" + search );

    try {
      if (res.status > 199 && res.status < 299) {
        console.log(res.data.data)
        setVouchers(res.data.data)
        setMetaData(res.data.meta)
        setLinks(res.data.links)
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsFetching(false)
    }
  };
  useEffect(() => {
    fetchVoucher();
    
    
  }, [search]);
  return (
    <div className="overflow-x-auto p-4 bg-white ">
      <h1 className="text-2xl mb-6 font-semibold text-blue-800">Vouchers</h1>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-nowrap text-gray-500 uppercase tracking-wider">
              Voucher Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-nowrap text-gray-500 uppercase tracking-wider">
              Customer Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date of purchase
            </th>

            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {
            isFetching ? <SkeletonLoader columns={6} /> : (vouchers.length == 0 ? (
              <EmptyRow message="No Voucher" columns={5} />
            ) : (
              vouchers.map((v, index) => <VoucherRow start={metaData.from} index={index} key={v.id} info={v} />)
            ))
          }
        </tbody>
      </table>
      <Pagination from={metaData.from} to={metaData.to} total={metaData.total} next={links.next} prev={links.prev} />
    </div>
  );
};

export default VoucherList;
