import { useGetAllProductsQuery } from "../../Redux/product/productApi";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../Redux/product/productSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function Products() {
  const dispatch = useDispatch();
  const { data } = useGetAllProductsQuery();
  let products = data?.data;

  return (
    <section className="py-8" id="products">
      <div className="container">
        <div className=" flex bg-primary justify-center py-3 rounded-xl">
          <h3 className="font-bold text-white text-2xl">Our Products</h3>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-3">
          {products?.map((product) => (
            <div
              key={product?._id}
              className="bg-white border shadow p-2.5 pb-4 rounded"
            >
              <PhotoProvider>
                <PhotoView
                  src={
                    import.meta.env.VITE_BACKEND_URL +
                    "/product/" +
                    product?.img
                  }
                >
                  <img
                    src={
                      import.meta.env.VITE_BACKEND_URL +
                      "/product/" +
                      product?.img
                    }
                    alt="Product Image"
                    className="w-full rounded border shadow-sm"
                  />
                </PhotoView>
              </PhotoProvider>

              <h2 className="text-lg font-bold mt-4">{product?.title}</h2>

              <div className="mt-2 flex justify-between">
                <p className="font-semibold">Price: {product?.price} ৳</p>

                <div className="flex items-end">
                  <a
                    href="#order"
                    onClick={() => dispatch(setSelectedProduct(product))}
                    className="py-1.5 px-2.5 border border-transparent bg-gray-500 rounded text-sm text-white hover:border-gray-500 hover:bg-transparent hover:text-black duration-300"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
