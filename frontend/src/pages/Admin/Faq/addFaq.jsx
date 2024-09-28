import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCreateFaqMutation } from "../../../Redux/faq/faq";

export default function addFaq() {
  const navigate = useNavigate();
  const [addFaq, { isLoading }] = useCreateFaqMutation();

  //------------Handle Add Faq
  const handleAddFaq = async (e) => {
    e.preventDefault();
    const qus = e.target.qus.value;
    const ans = e.target.ans.value;

    const data = {
      qus,
      ans,
    };

    const res = await addFaq(data).unwrap();

    if (res?.success) {
      Swal.fire("", "Faq add success", "success");
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
        <h3>Add FAQ</h3>
      </div>
      <form className="p-4" onSubmit={handleAddFaq}>
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Qus</p>
              <input type="text" name="qus" required />
            </div>
            <div>
              <p className="mb-1">Ans</p>
              <input type="text" name="ans" required />
            </div>
          </div>
        </div>

        <div className="">
          <button
            disabled={isLoading && "disabled"}
            className="primary_btn mt-5"
          >
            {isLoading ? "Loading..." : "Add FAQ"}
          </button>
        </div>
      </form>
    </section>
  );
}
