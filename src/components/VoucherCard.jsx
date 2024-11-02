import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Axios";
import toast from "react-hot-toast";
import Invoice from "./Inv";

const VoucherCard = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [invData, setInvData] = useState({});

  const fetchCurrentVoucher = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/vouchers/${id}`);
      console.log(res);

      if (res.status > 199 && res.status < 299) {
        setInvData(res.data.data[0]);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentVoucher();
  }, []);
  return <div>{!isLoading && <Invoice data={invData} />}</div>;
};

export default VoucherCard;
