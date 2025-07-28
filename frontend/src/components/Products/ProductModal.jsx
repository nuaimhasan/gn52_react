import { IoMdCloseCircleOutline } from "react-icons/io";
import parser from "html-react-parser";

export default function ProductModal({ showModal, setShowModal, product }) {
  return (
    <>
      <button
        onClick={() => setShowModal(false)}
        className={`overlay ${showModal && "overlay_show"}`}
      ></button>

      <div
        className={`modal w-[93%] sm:w-auto overflow-y-auto max-h-[95%] ${
          showModal && "modal_show"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setShowModal(false)}>
            <IoMdCloseCircleOutline className="text-[22px] text-neutral" />
          </button>
        </div>
        <img
          src={import.meta.env.VITE_BACKEND_URL + "/product/" + product?.img}
          alt={product?.title}
          className="w-[90%] sm:w-2/3 mx-auto rounded"
        />

        <div className="p-4 text-center">
          <h2 className="text-2xl font-semibold text-start">
            {product?.title}
          </h2>

          <div className="mt-2 mb-4 flex justify-between items-center">
            <div>
              {product?.discountPrice > 0 ? (
                <div className="flex items-center gap-2">
                  <p className="font-semibold">
                    Price: {product?.discountPrice}৳
                  </p>
                  <del className="font-semibold text-sm text-red-500">
                    {product?.price}৳
                  </del>
                </div>
              ) : (
                <p className="font-semibold">Price: {product?.price} ৳</p>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {product?.description && parser(product?.description)}
          </p>
        </div>
      </div>
    </>
  );
}
