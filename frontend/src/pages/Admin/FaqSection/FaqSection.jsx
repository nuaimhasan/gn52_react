import Swal from "sweetalert2";
import {
  useGetFaqSectionQuery,
  useAddFaqSectionMutation,
  useUpdateFaqSectionMutation,
} from "../../../Redux/faq/faqSectionApi";

export default function FaqSection() {
  const { data } = useGetFaqSectionQuery();
  const section = data?.data;

  const [addFaqSection, { isLoading: addLoading }] =
  useAddFaqSectionMutation();
  const [updateFaqSection, { isLoading }] =
  useUpdateFaqSectionMutation();

  //------------Handle Add Product
  const handleFaqSection = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const info = {
      title,
    };

    let id = section?._id;

    if (id) {
      const res = await updateFaqSection({ id, info });

      if (res?.data?.success) {
        Swal.fire("", "Faq Section update success", "success");
      } else {
        Swal.fire("", "something went wrong!", "error");
        console.log(res);
      }
    } else {
      const res = await addFaqSection(info);

      if (res?.data?.success) {
        Swal.fire("", "Faq Section add success", "success");
      } else {
        Swal.fire("", "something went wrong!", "error");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Faq Section</h3>
      </div>

      <form className="p-4" onSubmit={handleFaqSection}>
        <div className="text-neutral-content">
          <div>
            {/* title */}
            <div >
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={section?.title}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={(isLoading || addLoading) && "disabled"}
            className="primary_btn"
          >
            {isLoading || addLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
