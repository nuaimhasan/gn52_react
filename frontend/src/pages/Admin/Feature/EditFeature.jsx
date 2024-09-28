import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useGetFeatureByIdQuery,
  useUpdateFeatureMutation,
} from "../../../Redux/feature/featureApi";

export default function EditFeature() {
  const navigate = useNavigate();
  const [img, setImg] = useState([]);

  const { id } = useParams();
  const { data } = useGetFeatureByIdQuery(id);
  const feature = data?.data;

  const [updateFeature, { isLoading }] = useUpdateFeatureMutation();

  //------------Handle Add Product
  const handleAddFeature = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const formData = new FormData();
    formData.append("title", title);

    if (img?.length > 0) {
      formData.append("icon", img[0].file);
    }

    const res = await updateFeature({ id, formData }).unwrap();

    if (res?.success) {
      Swal.fire("", "Feature add success", "success");
      e.target.reset();
      setImg([]);
      navigate("/admin/features/all");
    } else {
      Swal.fire("", "something went wrong!", "error");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Feature</h3>
      </div>

      <form className="p-4" onSubmit={handleAddFeature}>
        <div className="text-neutral-content flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 items-center">
            {/* title */}
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={feature?.title}
              />
            </div>
          </div>

          {/* image */}
          <div className="flex flex-col border rounded border-dashed p-4">
            <div>
              <p className="mb-1">Image</p>
              <div>
                <ImageUploading
                  defaultValue={img}
                  onChange={(img) => setImg(img)}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload, onImageRemove, dragProps }) => (
                    <div {...dragProps}>
                      <div className="flex items-center gap-2">
                        <span
                          onClick={onImageUpload}
                          className="w-max px-4 py-1.5 rounded-2xl text-base-100 bg-primary cursor-pointer text-sm"
                        >
                          Choose Image
                        </span>

                        <p className="text-neutral-content">or Drop here</p>
                      </div>

                      <div className={`${img?.length > 0 && "mt-4"} `}>
                        {img?.map((img, index) => (
                          <div key={index} className="image-item relative w-40">
                            <img
                              src={img["data_url"]}
                              alt=""
                              className="w-28"
                            />
                            <div
                              onClick={() => onImageRemove(index)}
                              className="w-7 h-7 bg-primary rounded-full flex justify-center items-center text-base-100 absolute top-0 right-0 cursor-pointer"
                            >
                              <AiFillDelete />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </ImageUploading>
              </div>
            </div>

            {feature?.icon && (
              <div className="border-l">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/feature/${
                    feature?.icon
                  }`}
                  alt=""
                  className="w-28 mx-auto"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading && "disabled"} className="primary_btn">
            {isLoading ? "Loading..." : "Edit Feature"}
          </button>
        </div>
      </form>
    </section>
  );
}
