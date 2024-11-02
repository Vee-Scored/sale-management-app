import React, { useEffect, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";

import clsx from "clsx";
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecordStore } from "../store/useRecordStore";

import { Minus, Plus } from "lucide-react";
import axios from "axios";
import axiosInstance from "../Axios";

const SaleForm = () => {
  //const { products } = useProductStore();
  const [products,setProducts] = useState([])
  const fetchProduct = async () => {
    const res = await axiosInstance.get("/products?limit=100")

    setProducts(res.data.data)
    console.log(res)
  }
  useEffect(() => {
    fetchProduct();
  },[])
  const { addRecord,changeQty,records } = useRecordStore();
  const [query, setQuery] = useState("");

  const nav = useNavigate();
  const { register, reset, control, handleSubmit, watch, setValue } = useForm();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) ? 1 : Math.max(1, value));
  };

  // const getProducts = products?.map(({ id, product_name, price }) => ({
  //   id,
  //   product_name,
  //   price,
  // }));
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const filteredProducts =
    query === ""
      ? products
      : products?.filter((product) =>
          product.product_name.toLowerCase().includes(query.toLowerCase())
        );


  const submitProduct = (data) => {
    const now = new Date().toISOString();
    const cost = quantity * selectedProduct.price;
    const recordData = {
      product_id: selectedProduct.id,
      product: selectedProduct,
      quantity: quantity,
      cost,
      created_at : now
    };

    const existedRecord = records.find(r => r.product_id == selectedProduct.id)
    if (existedRecord) {
      changeQty(selectedProduct.id,1)
    } else {
      addRecord(recordData)
    }

    setQuantity(1)
  };
  return (
    <form  className=" h-full" onSubmit={handleSubmit(submitProduct)}>
      <div className=" h-full flex-grow flex flex-col gap-3">
        <div className="flex flex-row gap-3  lg:flex-col">
          <div className=" w-full">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Choose Product
            </label>
            <Combobox
              value={selectedProduct}
              onChange={(value) => setSelectedProduct(value)}
              onClose={() => setQuery("")}
            >
              <div className="relative">
                <ComboboxInput
                  {...register("product_name", { required: true })}
                  className="px-4 py-2 h-10 border focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="product"
                  displayValue={(product) => product?.product_name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                  <ChevronDownIcon className="size-4 fill-gray-500 dark:fill-gray-400 group-hover:fill-gray-600 dark:group-hover:fill-gray-300" />
                </ComboboxButton>
              </div>

              <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                  "w-[var(--input-width)] rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                  "transition duration-100 ease-in opacity-100 data-[leave]:data-[closed]:opacity-0"
                )}
              >
                {products.length == 0 ? (
                  <ComboboxOption className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700">
                    <CheckIcon className="invisible size-4 fill-gray-500 dark:fill-gray-300 group-data-[selected]:visible" />
                    <div className="text-sm text-gray-800 dark:text-gray-200">
                      there's no product
                    </div>
                  </ComboboxOption>
                ) : (
                  filteredProducts.map((product) => (
                    <ComboboxOption
                      key={product.id}
                      value={product}
                      className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700"
                    >
                      <CheckIcon className="invisible size-4 fill-gray-500 dark:fill-gray-300 group-data-[selected]:visible" />
                      <div className="text-sm text-gray-800 dark:text-gray-200">
                        {product.product_name}
                      </div>
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Combobox>
          </div>
          <div className=" w-full">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity
            </label>
            <div className="flex items-stretch">
              <button
                type="button"
                className="flex-shrink-0 w-12 flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none "
                onClick={handleDecrement}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                {...register("quantity", { required: true })}
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleInputChange}
                className="px-4 py-2 h-10 border-y pointer-events-none border-gray-300 outline-none  block w-full text-center sm:text-sm"
                placeholder="Quantity"
                min="1"
              />
              <button
                type="button"
                className="flex-shrink-0 w-12 flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none "
                onClick={handleIncrement}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex mt-auto flex-col">
          <button
            type="submit"
            className="w-full  bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Add product
          </button>
        </div>
      </div>
    </form>
  );
};

export default SaleForm;
