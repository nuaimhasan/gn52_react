import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import { useAddProductMutation } from "../../../Redux/product/productApi";

export default function AddProduct() {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);

  const [addProduct, { isLoading }] = useAddProductMutation();

  //------------Handle Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const price = e.target.price.value;

    if (image?.length <= 0) {
      return Swal.fire("", "Image is required", "warning");
    }


    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("img", image[0].file);

    const res = await addProduct(formData).unwrap();

    if (res?.success) {
      Swal.fire("", "Product add success", "success");
      e.target.reset();
      setImage([]);
      navigate("/admin/product/all");
    } else {
      Swal.fire("", "something went wrong!", "error");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Product</h3>
      </div>

      <form className="p-4" onSubmit={handleAddProduct}>
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" required />
            </div>
            <div>
              <p className="mb-1">Price</p>
              <input type="number" name="price" required />
            </div>

            <div>
              <p className="mb-1">Image</p>
              <div>
                <ImageUploading
                  defaultValue={image}
                  onChange={(icn) => setImage(icn)}
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

                      <div className={`${image?.length > 0 && "mt-4"} `}>
                        {image?.map((img, index) => (
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
