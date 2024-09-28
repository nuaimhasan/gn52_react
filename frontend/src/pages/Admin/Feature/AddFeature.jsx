import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import { useAddFeatureMutation } from "../../../Redux/feature/featureApi";

export default function AddFeature() {
  const navigate = useNavigate();
  const [img, setImg] = useState([]);

  const [addFeature, { isLoading }] = useAddFeatureMutation();

  //------------Handle Add Product
  const handleAddFeature = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    if (img?.length <= 0) {
      return Swal.fire("", "Img is required", "warning");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("icon", img[0].file);

    const res = await addFeature(formData).unwrap();

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
        <h3>Add Feature</h3>
      </div>

      <form className="p-4" onSubmit={handleAddFeature}>
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" required />
            </div>

            <div>
              <p className="mb-1">Icon</p>
              <div>
                <ImageUploading
                  defaultValue={img}
                  onChange={(icon) => setImg(icon)}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload, onImageRemove, dragProps }) => (
                    <div
                      className="border rounded border-dashed p-4"
                      {...dragProps}
                    >
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
                          <div key={index} className="image-item relative">
                            <img
                              src={img["data_url"]}
                              alt=""
                              className="w-24"
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
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading && "disabled"} className="primary_btn">
            {isLoading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </form>
    </section>
  );
}
