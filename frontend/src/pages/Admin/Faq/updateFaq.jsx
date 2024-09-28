import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetFaqByIdQuery,
  useUpdateFaqMutation,
} from "../../../Redux/faq/faq";

export default function updateFaq() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetFaqByIdQuery(id);
  const faq = data?.data;

  const [updateFaq, { isLoading }] = useUpdateFaqMutation();

  //------------Handle Add Faq
  const handleAddFaq = async (e) => {
    e.preventDefault();
    const qus = e.target.qus.value;
    const ans = e.target.ans.value;

    const data = {
      qus,
      ans,
    };

    const res = await updateFaq({ id, data });

    if (res?.data?.success) {
      Swal.fire("", "Faq update success", "success");
      e.target.reset();
      navigate("/admin/faq");
    } else {
      Swal.fire("", "something went wrong!", "error");
      console.log(res);
    }
  };
  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Your FAQ</h3>
      </div>

      <form className="p-4" onSubmit={handleAddFaq}>
        <div className="text-neutral-content grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            {/* title */}
            <div>
              <p className="mb-1">Qus</p>
              <input type="text" name="qus" required defaultValue={faq?.qus} />
            </div>
            <div>
              <p className="mb-1">Ans</p>
              <input type="text" name="ans" required defaultValue={faq?.ans} />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading && "disabled"} className="primary_btn">
            {isLoading ? "Loading..." : "Edit Faq"}
          </button>
        </div>
      </form>
    </section>
  );
}
