import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner/Spinner";
import {
  useDeleteFeatureByIdMutation,
  useGetAllFeatureQuery,
} from "../../../Redux/feature/featureApi";

export default function FeatureList() {
  const { data, isLoading, isError, isSuccess } = useGetAllFeatureQuery();
  const features = data?.data;

  const [deleteFeature] = useDeleteFeatureByIdMutation();
  const deleteFeatureHandler = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this product?");
    if (isConfirm) {
      try {
        const res = await deleteFeature(id);

        if (res?.data?.success) {
          Swal.fire({
            title: "",
            text: "Feature Deleted Successfully",
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
        {features?.map((feature, i) => (
          <tr key={feature?._id}>
            <td>{i + 1}</td>
            <td>{feature?.title}</td>
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/feature/${
                  feature?.icon
                }`}
                alt={feature?.img}
                className="w-14 h-8 rounded"
              />
            </td>
            <td>
              <div className="flex gap-3 items-center">
                <Link to={`/admin/feature/edit/${feature?._id}`}>
                  <AiOutlineEdit className="text-lg hover:text-red-500" />
                </Link>
                <button onClick={() => deleteFeatureHandler(feature?._id)}>
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
          <h1 className="font-medium text-neutral">Features</h1>
          <Link to="/admin/feature/add" className="primary_btn text-sm">
            Add Feature
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
}
