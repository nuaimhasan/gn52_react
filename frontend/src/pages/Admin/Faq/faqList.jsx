import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
    useDeleteFaqByIdMutation,
    useGetFaqQuery,
} from "../../../Redux/faq/faq";
import Spinner from "../../../components/Spinner/Spinner";


export default function faqList() {

    const { data, isLoading, isError, isSuccess } = useGetFaqQuery();
    const faq = data?.data;
  
    const [deleteFaq] = useDeleteFaqByIdMutation();
    const deleteFaqHandler = async (id) => {
      const isConfirm = window.confirm("Are you sure delete this Faq?");
      if (isConfirm) {
        try {
          const res = await deleteFaq(id).unwrap();
          if (res?.success) {
            Swal.fire({
              title: "",
              text: "Faq Deleted Successfully",
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
          {faq?.map((faq, i) => (
            <tr key={faq?._id}>
              <td>{i + 1}</td>
              <td>{faq?.qus}</td>
              <td>{faq?.ans}</td>
              <td>
                <div className="flex gap-3 items-center">
                  <Link to={`/admin/faq/edit/${faq?._id}`}>
                    <AiOutlineEdit className="text-lg hover:text-red-500" />
                  </Link>
                  <button onClick={() => deleteFaqHandler(faq?._id)}>
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
          <h1 className="font-medium text-neutral">FAQ</h1>
          <Link to="/admin/faq/add" className="primary_btn text-sm">
            Add FAQ
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Qus</th>
              <th>Ans</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  )
}
