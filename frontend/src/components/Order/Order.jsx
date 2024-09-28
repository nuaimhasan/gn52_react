import { useEffect, useRef, useState } from "react";
import { MdArrowDropUp, MdAddCall } from "react-icons/md";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../../Redux/order/orderApi";
import { useGetBusinessQuery } from "../../Redux/businessInfo/businessInfo";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "../../Redux/product/productSlice";
import TagManager from "react-gtm-module";

export default function Order() {
  const orderRef = useRef(null);
  const { data } = useGetBusinessQuery();
  const contactInfo = data?.data[0];

  const product = useSelector((state) => state.product?.selectedProduct);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState(80);
  const [validPhone, setValidPhone] = useState("");

  const total = product?.price * quantity + shipping;

  useEffect(() => {
    if (product) {
      TagManager.dataLayer({
        dataLayer: {
          event: "checkout",
          checkout: {
            currency: "BDT",
            items: [
              {
                item_id: product?._id,
                item_name: product?.title,
                price: product?.price,
                quantity: quantity,
              },
            ],
          },
        },
      });
    }
  }, [product, quantity, total]);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.number.value;
    const city = form.city.value;
    const address = form.address.value;

    if (phone?.length !== 11) {
      return setValidPhone("please provide valid phone number");
    } else {
      setValidPhone("");
    }

    if (!product) {
      return Swal.fire("", "Please select a product", "warning");
    }

    const orderInfo = {
      name,
      phone,
      city,
      address,
      quantity,
      shipping,
      total,
      product: {
        id: product?._id,
        title: product?.title,
        price: product?.price,
        img: product?.img,
      },
    };

    const res = await createOrder(orderInfo);

    if (res?.error) {
      return Swal.fire(
        "",
        res?.error?.data?.message
          ? res?.error?.data?.message
          : "something went wrong",
        "error"
      );
    }

    if (res?.data?.success) {
      Swal.fire("", "Order create success", "success");
      form.reset();
      setQuantity(1);
      dispatch(setSelectedProduct(undefined));
      TagManager.dataLayer({
        dataLayer: {
          event: "purchase",
          purchase: {
            transaction_id: res?.data?.data?._id,
            value: total,
            currency: "BDT",
            items: [
              {
                item_id: product?.id,
                item_name: product?.title,
                price: product?.price,
                quantity: quantity,
              },
            ],
            user_name: name,
            user_city: city,
            user_state: address,
            user_country: "Bangladesh",
            user_phone_number: phone,
          },
        },
      });
    }
  };

  return (
    <section ref={orderRef} className="py-5 sm:py-10" id="order">
      <div className="container">
        <div className="border-2 border-primary rounded p-5 sm:p-10">
          <h2 className="sm:text-xl font-semibold text-center">
            অর্ডার করতে আপনার সঠিক তথ্য দিয়ে নিচের ফর্মটি সম্পূর্ণ পূরন করুন।
            <br /> (আগে থেকে কোন টাকা দেয়া লাগবে না। প্রোডাক্ট হাতে পাবার পর
            টাকা দিবেন)
          </h2>

          <form
            onSubmit={handlePlaceOrder}
            className="mt-6 grid md:grid-cols-2 gap-6 lg:gap-16"
          >
            <div>
              <h2 className="text-lg font-medium">Billing Details</h2>
              <br />
              <div className="flex flex-col gap-3">
                <div>
                  <small className="text-neutral-content">
                    আপনার নাম লিখুন *
                  </small>
                  <input type="text" name="name" required />
                </div>

                <div>
                  <small className="text-neutral-content">
                    আপনার মোবাইল নাম্বারটি লিখুন *
                  </small>
                  <input type="number" name="number" required />
                  {validPhone && (
                    <small className="text-red-500">{validPhone}</small>
                  )}
                </div>

                <div>
                  <small className="text-neutral-content">
                    আপনার শহরের নাম লিখুন *
                  </small>
                  <input type="text" name="city" required />
                </div>

                <div>
                  <small className="text-neutral-content">
                    আপনার সম্পূর্ণ ঠিকানা লিখুন *
                  </small>
                  <textarea name="address" rows="4" required></textarea>
                </div>
              </div>
            </div>

            {/*  */}
            <div>
              <h2 className="text-lg font-medium">Your Order</h2>

              <div>
                <div className="flex justify-between items-center border-b py-2 border-dashed border-gray-400">
                  {product ? (
                    <>
                      <div className="flex items-center gap-1">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/product/${
                            product?.img
                          }`}
                          alt=""
                          className="w-11 h-11 p-1"
                        />
                        <div>
                          <p className="text-neutral text-[15px]">
                            {product?.title}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>{product?.price} টাকা</p>
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold text-xl w-full text-center border bg-gray-200 rounded-lg py-4 mb-4">
                      <a href="#products">Please select a Product</a>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center border-b py-2.5 border-dashed border-gray-400">
                  <p className="text-neutral-content">Quantity</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-content">
                      <div
                        onClick={() => {
                          if (quantity > 1) {
                            setQuantity(quantity - 1);
                          }
                        }}
                        className="cursor-pointer bg-gray-100 px-1.5 rounded hover:bg-gray-200 duration-200"
                      >
                        -
                      </div>
                      <div>{quantity}</div>
                      <div
                        onClick={() => setQuantity(quantity + 1)}
                        className="cursor-pointer bg-gray-100 px-1.5 rounded hover:bg-gray-200 duration-200"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b py-2.5 border-dashed border-gray-400">
                  <p className="text-neutral-content">Subtotal</p>
                  <p className="text-primary flex items-center gap-px">
                    {product ? quantity * product?.price : "00"} টাকা
                  </p>
                </div>

                <div className="flex justify-between items-center border-b py-2.5 border-dashed border-gray-400">
                  <p className="text-neutral-content">Shipping</p>

                  <div>
                    <div className="flex items-center text-neutral">
                      <input
                        id="insideDhaka"
                        type="radio"
                        value="80"
                        name="shipping"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 "
                        onClick={() => setShipping(80)}
                        defaultChecked={shipping == 80 && "checked"}
                      />
                      <label
                        htmlFor="insideDhaka"
                        className="ms-2 text-sm font-medium"
                      >
                        ঢাকার ভিতরে: ৮০ টাকা
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="outsideDhaka"
                        type="radio"
                        value="140"
                        name="shipping"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                        onClick={() => setShipping(140)}
                        defaultChecked={shipping == 140 && "checked"}
                      />
                      <label
                        htmlFor="outsideDhaka"
                        className="ms-2 text-sm font-medium"
                      >
                        ঢাকার বাহিরে: ১৪০ টাকা
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 font-medium text-lg">
                  <p className="text-neutral-content">Total</p>
                  <p className="text-primary">{product ? total : "00"} টাকা</p>
                </div>

                <div className="mt-4 bg-gray-100 p-4 rounded text-neutral-content">
                  <h2>ক্যাশ অন ডেলিভারি</h2>
                  <div className="relative bg-gray-200 p-3 rounded mt-3">
                    <p className="text-sm">
                      পণ্য হাতে পেয়ে ডেলিভারি ম্যানকে পেমেন্ট করতে পারবেন।
                    </p>

                    <div className="absolute -top-8 left-6">
                      <MdArrowDropUp className="text-gray-200 text-6xl" />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="text-center w-full bg-primary text-base-100 rounded py-2.5 font-semibold">
                    {isLoading
                      ? "Loading..."
                      : `অর্ডার কনফার্ম করুন - ${product ? total : "00"} টাকা`}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-2 sm:mt-10 sm:text-xl font-semibold flex flex-col justify-center items-center text-center">
          <p>অর্ডার করতে অথবা বিস্তারিত জানতে সরাসরি কল করুনঃ</p>
          <span className="flex text-primary items-center gap-1 text-lg sm:text-2xl">
            <MdAddCall />
            <span className="whitespace-nowrap">{contactInfo?.phone}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
