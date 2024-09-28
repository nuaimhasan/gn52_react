import Swal from "sweetalert2";
import {
  useAddFeatureSectionMutation,
  useGetFeatureSectionQuery,
  useUpdateFeatureSectionMutation,
} from "../../../Redux/feature/featureSectionApi";

export default function FeatureSection() {
  const { data } = useGetFeatureSectionQuery();
  const section = data?.data;

  const [addFeatureSection, { isLoading: addLoading }] =
    useAddFeatureSectionMutation();
  const [updateFeatureSection, { isLoading }] =
    useUpdateFeatureSectionMutation();

  //------------Handle Add Product
  const handleFeatureSection = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const info = {
      title,
    };

    let id = section?._id;

    if (id) {
      const res = await updateFeatureSection({ id, info });

      if (res?.data?.success) {
        Swal.fire("", "Feature Section update success", "success");
      } else {
        Swal.fire("", "something went wrong!", "error");
        console.log(res);
      }
    } else {
      const res = await addFeatureSection(info);

      if (res?.data?.success) {
        Swal.fire("", "Feature Section add success", "success");
      } else {
        Swal.fire("", "something went wrong!", "error");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Feature Section</h3>
      </div>

      <form className="p-4" onSubmit={handleFeatureSection}>
        <div className="text-neutral-content">
          <div>
            {/* title */}
            <div>
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
