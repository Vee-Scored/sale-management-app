import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProductRow from "./ProductRow";
import SkeletonLoader from "./SkeletonRow";
import EmptyRow from "./EmptyRow";
import Pagination from "./Pagination";
import axiosInstance from "../Axios";
import { debounce } from "lodash";

export default function ProductTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, setProduct } = useProductStore();
  const { search } = useLocation();
  const [param, setParam] = useSearchParams();
  const [metaData, setMetaData] = useState({});
  const [links, setLinks] = useState({});
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const q =param.get('q')

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/products" + search);

      if (res.status > 199 && res.status < 299) {
        setProduct(res.data.data);
        setMetaData(res.data.meta);
        setLinks(res.data.links);
      } else {
        console.error("HTTP error:", res.status);
        return;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [search]);

  const searchedProduct = async (keyword) => {

    const res = await axiosInstance.get("/products" + `?q=${keyword}`);
    setProduct(res.data.data);
    setMetaData(res.data.meta);
    setLinks(res.data.links);
    
  };
  const searchHandler = async (e) => {
    setParam({q : e.target.value})
    debounce(searchedProduct(e.target.value), 1000);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-800">Products</h1>
      </div>

      <div className="mb-4 flex justify-between">
        <div>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={q}
            onChange={searchHandler}
          />
        </div>
        <div>
          <button
            onClick={() => nav("/dashboard/product/create")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-150 ease-in-out"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar  bg-white ">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated At
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <SkeletonLoader columns={6} />
            ) : filteredProducts.length == 0 ? (
              <EmptyRow columns={6} />
            ) : (
              products.map((product, index) => (
                <ProductRow
                  key={product.id}
                  index={index}
                  start={metaData.from}
                  product={product}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        to={metaData.to}
        prev={links.prev}
        next={links.next}
        from={metaData.from}
        total={metaData.total}
      />
    </div>
  );
}
