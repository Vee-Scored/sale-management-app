import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import SaleForm from "./SaleForm";
import { useRecordStore } from "../store/useRecordStore";
import RecordTable from "./RecordTable";
import axiosInstance from "../Axios";
import toast from "react-hot-toast";
import "ldrs/ring";

// Default values shown

export default function OpeningVoucher() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const { records, resetRecord} = useRecordStore();

  const netTotal = records.reduce((pv, cv) => pv + cv.cost, 0);
  const tax = netTotal * 0.1;
  const total = netTotal + tax;

  const { register, control, handleSubmit, watch, setValue,reset } = useForm({
    defaultValues: {
      customerName: "",
      customerEmail: "",
      purchaseDate: new Date().toISOString().substr(0, 10),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchProducts = watch("products");

  useEffect(() => {
    // Generate a random invoice number
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setInvoiceNumber(`INV-${randomNum}`);
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      console.log(records);
      const voucher = {
        voucher_id: invoiceNumber,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        sale_date: data.purchaseDate,
        records: records,
        total: netTotal,
        tax: tax,
        net_total: total,
      };

      const res = await axiosInstance.post("/vouchers", voucher);

      if (res.status > 199 && res.status < 299) {
        toast.success(res.data.message);
      }

      // Handle successful form submission here
    } catch (error) {
      toast.error(error.message);

      // Handle error scenario, possibly show a user-friendly message
    } finally {
      setSubmitting(false);
      resetRecord();
      reset()
    }
  };

  return (
    <div className="min-h-screen  ">
      <div className="relative p-4  ">
        <div className="max-w-full mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h2 className="text-2xl mb-1 font-semibold text-blue-700">
                Opening Voucher
              </h2>
              <p className="text-sm text-gray-500">Invoice: {invoiceNumber}</p>
            </div>
          </div>
          <form
            id="voucherForm"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  {...register("customerName", { required: true })}
                  className="px-4 h-10 py-2 border focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="Customer name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Customer Email
                </label>
                <input
                  type="email"
                  {...register("customerEmail", { required: true })}
                  className="px-4 py-2 h-10 border focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="customer@example.com"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Purchase Date
                </label>
                <input
                  type="date"
                  {...register("purchaseDate", { required: true })}
                  className="px-4 h-10 py-2 border focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300"
                />
              </div>
            </div>
          </form>

          {/* product add component  */}

          <div className="lg:grid grid-cols-4 my-2">
            <div className="col-span-1  border p-3">
              <SaleForm />
            </div>
            <div className="col-span-3">
              <RecordTable />
            </div>
          </div>

          {/* product add component */}

          <div className="pt-4 flex">
            <div className=" basis-3/4 md:basis-2/4 xl:basis-1/4  ml-auto space-y-4 px-10 ">
              <div className="flex justify-between items-center">
                <span className="font-medium">Net Total:</span>
                <span>{netTotal} MMK</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Tax (10%): </span>
                <span>{tax} MMK</span>
              </div>
              <div className="flex justify-between items-center text-blue-700 font-bold">
                <span>Total:</span>
                <span>{total} MMK</span>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button
              form="voucherForm"
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3 ">
                  Creating voucher
                  <l-ring
                    size="20"
                    stroke="3"
                    bg-opacity="0"
                    speed="2"
                    color="white"
                  ></l-ring>
                </span>
              ) : (
                "Create voucher"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
