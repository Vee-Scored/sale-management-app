import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../Axios'
import { useProductStore } from '../store/useProductStore'

export default function ProductCreateForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {setProduct, addProduct} = useProductStore();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      const res = await axiosInstance.post("/products", {
        product_name: data.name,
        price: data.price + ".00",
      });
  
      console.log(res);
      if (res.status > 199 && res.status < 299) {
        addProduct(res.data.data)
        nav("/dashboard/product/list")
        location.reload();
      }
      
      // Reset form or redirect to product list
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="">
      <div className="max-w-2xl  bg-white  overflow-hidden">
        <div className="  py-4 px-6">
          <h2 className="text-2xl text-blue-700 font-bold">Create New Product</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Product name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              step="0.01"
              {...register("price", { 
                required: "Price is required",
                min: { value: 0.01, message: "Price must be greater than 0" }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
            />
            {errors.price && <p className="text-red-500 text-xs italic">{errors.price.message}</p>}
          </div>

          

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={() => nav('/dashboard/product/list')}
              className="flex items-center text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back to Products
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}