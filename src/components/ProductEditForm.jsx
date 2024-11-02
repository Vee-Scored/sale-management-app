import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Axios";
import { useProductStore } from "../store/useProductStore";
import toast from "react-hot-toast";

export default function ProductEditForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { products, editProduct } = useProductStore();
  const [currentItem, setItem] = useState();
  const nav = useNavigate();
  const { id } = useParams();

  const fetchCurrentItem = async () => {
    const res = await axiosInstance.get(`/products/${id}`);

    setItem(res.data.data);
  };
  useEffect(() => {
    fetchCurrentItem();
  }, []);

  console.log(currentItem);
  if (currentItem) {
    setValue("name", currentItem.product_name);
    setValue("price", currentItem.price);
  }
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Simulate API call
      console.log(data);
      const formData = new FormData();
      formData.append("product_name", data.name);
      formData.append("price", data.price);
      const res = await axiosInstance.put(`/products/${id}`, formData);

      if (res.status > 199 && res.status < 299) {
        await editProduct(id, res.data.data);

        nav("/dashboard/product/list");
        setItem(res.data.data);
      }

      // Reset form or redirect to product list
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };

  return (
    <div className="">
      <div className="max-w-2xl  bg-white  overflow-hidden">
        <div className="  py-4 px-6">
          <h2 className="text-2xl text-blue-700 font-bold">Edit Product</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              step="0.01"
              {...register("price")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-xs italic">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={() => nav("/dashboard/product/list")}
              className="flex items-center text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back to Products
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
