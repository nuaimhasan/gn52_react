import swal from "sweetalert2";
import {
  useAddBannerMutation,
  useGetBannerQuery,
  useUpdateBannerMutation,
} from "../../../Redux/banner/banner";

export default function Banner() {
  const { data } = useGetBannerQuery();
  const banner = data?.data[0];
  const id = banner?._id;  

  const [addBanner, { isLoading: addIsLoading }] =
  useAddBannerMutation();
  const [updateBanner, { isLoading: updateIsLoading }] =
  useUpdateBannerMutation();

  const hanldeAddUpdate = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const videoLink = e.target.videoLink.value;

    const info = {
      title,
      description,
      videoLink,
    };

    if (id) {
      const res = await updateBanner({ id, info });
      if (res?.data?.success) {
        swal.fire("", "Banner update Success", "success");
      } else {
        swal.fire("", "something went wrong!", "error");
      }
    } else {
      const res = await addBanner(info);
      if (res?.data?.success) {
        swal.fire("", "Banner Add Success", "success");
      } else {
        swal.fire("", "something went wrong!", "error");
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Banner</h3>
      </div>

      <form className="p-4" onSubmit={hanldeAddUpdate}>
        <div className="text-neutral-content flex flex-col gap-4 w-full items-start">
          <div className="w-full">
            <p className="mb-1">Banner Title</p>
            <input
              type="text"
              name="title"
              required
              defaultValue={banner?.title}
            />
          </div>
          <div className="w-full">
            <p className="mb-1">Banner Description</p>
            <textarea
              type="text"
              name="description"
              required
              defaultValue={banner?.description}
            />
          </div>

          <div className="w-full">
            <p className="mb-1">Banner Video Link</p>
            <textarea
              type="text"
              name="videoLink"
              required
              defaultValue={banner?.videoLink}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={addIsLoading || (updateIsLoading && "disabled")}
              className="primary_btn"
            >
              {addIsLoading || updateIsLoading
                ? "Loading..."
                : id
                ? "Update"
                : "Add"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
