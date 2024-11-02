import { PencilIcon, TrashIcon } from "lucide-react";
import React from "react";
import axiosInstance from "../Axios";
import Swal from "sweetalert2";
import { useProductStore } from "../store/useProductStore";
import { useNavigate } from "react-router-dom";
import { usePaginationStore } from "../store/usePaginationStore";

const ProductRow = ({ product, index, start }) => {
  const { deleteProduct, products } = useProductStore();
  const nav = useNavigate();

  const deleteBtnHandler = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Product will be deleted permantly! ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/products/${product.id}`);
          deleteProduct(product.id);
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });

        
        }
      });

      // Reset form or redirect to product list
    } catch (error) {
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const editBtnHandler = () => {
    nav(`/dashboard/product/edit/${product.id}`);
  };
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {index + start}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {product.product_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
        {product.price} MMK
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.created_at}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.updated_at}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          className="text-blue-600 hover:text-blue-900 mr-3"
          onClick={() => editBtnHandler()}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => deleteBtnHandler()}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
