import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteProductByIdMutation,
  useGetAllProductsQuery,
} from "../../../Redux/product/productApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function ProductsList() {
  const { data, isLoading, isError, isSuccess } = useGetAllProductsQuery();
  const products = data?.data;

  const [deleteProduct] = useDeleteProductByIdMutation();
  const deleteProductHandler = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this product?");
    if (isConfirm) {
      try {
        const res = await deleteProduct(id).unwrap();
        if (res?.success) {
          Swal.fire({
            title: "",
            text: "Product Deleted Successfully",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "",
          text: "Something went wrong",
          icon: "error",
        });
      }
    }
  };

  let content = null;
  if (isLoading) return (content = <Spinner />);

  if (isError) {
    content = (
      <p className="text-red-500 mt-5">Something went wrong to get data!</p>
    );
  }

  if (!isError && isSuccess) {
    content = (
      <tbody>
        {products?.map((product, i) => (
          <tr key={product?._id}>
            <td>{i + 1}</td>
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/product/${
                  product?.img
                }`}
                alt={product?.img}
                className="w-14 h-8 rounded"
              />
            </td>
            <td>{product?.title}</td>
            <td>{product?.price}</td>
            <td>{product?.discountPrice}</td>
            <td>
              <div className="flex gap-3 items-center">
                <Link to={`/admin/product/edit/${product?._id}`}>
                  <AiOutlineEdit className="text-lg hover:text-red-500" />
                </Link>
                <button onClick={() => deleteProductHandler(product?._id)}>
                  <AiOutlineDelete className="text-lg hover:text-red-500" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-neutral">Products</h1>
          <Link to="/admin/product/add" className="primary_btn text-sm">
            Add Product
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Discount Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
}
