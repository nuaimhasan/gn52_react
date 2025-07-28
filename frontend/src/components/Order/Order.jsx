import { useEffect, useRef, useState } from "react";
import { MdArrowDropUp, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../../Redux/order/orderApi";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateCartQuantity,
} from "../../Redux/product/productSlice";
import { useNavigate } from "react-router-dom";
import { useGetBusinessQuery } from "../../Redux/businessInfo/businessInfo";
import TagManager from "react-gtm-module";

export default function Order() {
  const orderRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState(80);
  const carts = useSelector((state) => state.product.carts);

  const { data } = useGetBusinessQuery();
  const shippingCharge = data?.data[0]?.shipping;

  useEffect(() => {
    if (shippingCharge) {
      setShipping(shippingCharge?.insideDhaka);
    }
  }, [shippingCharge]);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleRemoveProduct = (productId) => {
    const newCarts = carts?.filter((product) => product?.id !== productId);
    dispatch(removeFromCart(newCarts));
  };

  // Update quantity
  const handleQuantityChange = (id, action) => {
    const updatedCart = carts.map((item) => {
      if (item?.id === id) {
        return {
          ...item,
          quantity:
            action === "increment"
              ? item?.quantity + 1
              : Math.max(item?.quantity - 1, 1),
        };
      }
      return item;
    });

    dispatch(updateCartQuantity(updatedCart));
  };

  // Calculate total price
  const calculateTotal = () => {
    return carts.reduce(
      (total, product) => total + product?.quantity * product?.discountPrice,
      0
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (carts?.length > 0) {
              TagManager.dataLayer({
                dataLayer: {
                  event: "checkout",
                  checkout: {
                    customer: {
                      name: "",
                      phone: "",
                    },
                    ecommerce: {
                      currency: "BDT",
                      value: calculateTotal(),
                      shipping,

                      items: [
                        carts?.map((product) => ({
                          item_id: product?.id,
                          item_name: product?.title,
                          price: product?.price,
                          discountPrice: product?.discountPrice,
                          quantity: product?.quantity,
                        })),
                      ],
                    },
                  },
                },
              });
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (orderRef.current) {
      observer.observe(orderRef.current);
    }

    return () => {
      if (orderRef.current) {
        observer.unobserve(orderRef.current);
      }
    };
  }, [carts]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const phone = form.number.value;
    const city = form.city.value;
    const address = form.address.value;

    if (carts?.length === 0) {
      return Swal.fire("", "Please select a product", "warning");
    }

    const orderInfo = {
      name,
      phone,
      city,
      address,
      products: carts?.map((product) => {
        return {
          product: product?.id,
          quantity: product?.quantity,
        };
      }),
      shipping,
      total: calculateTotal() + shipping,
    };

    const res = await createOrder(orderInfo);

    if (res?.data?.success) {
      form.reset();
      Swal.fire(
        "Order Placed!",
        "Your order has been placed successfully.",
        "success"
      );

      dispatch(clearCart());
      navigate(`/order/success/${res?.data?.data?._id}`);
    } else {
      Swal.fire(
        "Order Failed!",
        "Something went wrong. Please try again.",
        "error"
      );
    }
    console.log(res);
  };

  return (
    <section ref={orderRef} className="py-5 sm:py-10" id="order">
      <div className="container">
        <div className="border-2 border-primary rounded p-5 sm:p-10 bg-secondary/10">
          <h2 className="sm:text-xl font-semibold text-center">
            To order, please fill out the form below with your correct
            information. <br />
            (No advance payment is required. Payment will be made upon receipt
            of the product)
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
                    Enter your name *
                  </small>
                  <input type="text" name="name" required />
                </div>

                <div>
                  <small className="text-neutral-content">
                    Enter your mobile number *
                  </small>
                  <input type="text" name="number" required />
                </div>

                <div>
                  <small className="text-neutral-content">
                    Enter your city *
                  </small>
                  <input type="text" name="city" required />
                </div>

                <div>
                  <small className="text-neutral-content">
                    Enter your full address *
                  </small>
                  <textarea name="address" rows="4" required></textarea>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium">Your Order</h2>
              <div>
                {carts.map((product) => (
                  <div
                    key={product?.id}
                    className="flex justify-between items-center border-b py-2 border-dashed border-gray-400"
                  >
                    <div className="w-full flex items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <div>
                          <MdDelete
                            onClick={() => handleRemoveProduct(product?.id)}
                            className="text-red-500 cursor-pointer text-xl"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <img
                            src={
                              import.meta.env.VITE_BACKEND_URL +
                              "/product/" +
                              product?.img
                            }
                            alt="product"
                            className="w-11 h-11 rounded"
                          />

                          <div>
                            <p className="text-neutral text-[15px]">
                              {product?.title}
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                              <div
                                onClick={() =>
                                  handleQuantityChange(product?.id, "decrement")
                                }
                                className="px-1.5 border cursor-pointer border-neutral rounded"
                              >
                                -
                              </div>
                              <span>{product.quantity}</span>
                              <div
                                onClick={() =>
                                  handleQuantityChange(product?.id, "increment")
                                }
                                className="px-1.5 border border-neutral rounded cursor-pointer"
                              >
                                +
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p>{product?.discountPrice} TK</p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center border-b py-2.5 border-dashed border-gray-400">
                  <p className="text-neutral-content">Subtotal</p>
                  <p className="text-primary flex items-center gap-px">
                    {calculateTotal()} TK
                  </p>
                </div>
                <div className="flex justify-between items-center border-b py-2.5 border-dashed border-gray-400 ">
                  <p className="text-neutral-content">Shipping</p>
                  <div className="text-neutral">
                    <div className="flex items-center">
                      <input
                        id="insideDhaka"
                        type="radio"
                        value={shippingCharge?.insideDhaka}
                        name="shipping"
                        className="w-4 h-4"
                        onClick={() => setShipping(shippingCharge?.insideDhaka)}
                        checked={shipping === shippingCharge?.insideDhaka}
                      />
                      <label
                        htmlFor="insideDhaka"
                        className="ms-2 text-sm font-medium"
                      >
                        Inside Dhaka: {shippingCharge?.insideDhaka} TK
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="outsideDhaka"
                        type="radio"
                        value={shippingCharge?.outsideDhaka}
                        name="shipping"
                        className="w-4 h-4"
                        onClick={() =>
                          setShipping(shippingCharge?.outsideDhaka)
                        }
                        checked={shipping === shippingCharge?.outsideDhaka}
                      />
                      <label
                        htmlFor="outsideDhaka"
                        className="ms-2 text-sm font-medium"
                      >
                        Outside Dhaka: {shippingCharge?.outsideDhaka} TK
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 font-medium text-lg">
                  <p className="text-neutral-content">Total</p>
                  <p className="text-primary">
                    {calculateTotal() + shipping} TK
                  </p>
                </div>

                <div className="mt-4 bg-gray-100 p-4 rounded text-neutral-content">
                  <h2>Cash on delivery</h2>
                  <div className="relative bg-gray-200 p-3 rounded mt-3">
                    <p className="text-sm">
                      You can pay the delivery man after receiving the product.
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
                      : `Confirm order - ${calculateTotal() + shipping} TK`}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
