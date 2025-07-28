import swal from "sweetalert2";
import {
  useAddBusinessMutation,
  useGetBusinessQuery,
  useUpdateBusinessMutation,
} from "../../../Redux/businessInfo/businessInfo";

export default function BusinessInfo() {
  const { data } = useGetBusinessQuery();
  const businessInfo = data?.data[0];
  const id = businessInfo?._id;

  const [addBusinessInfo, { isLoading: addIsLoading }] =
    useAddBusinessMutation();
  const [updateBusinessInfo, { isLoading: updateIsLoading }] =
    useUpdateBusinessMutation();

  const hanldeAddUpdate = async (e) => {
    e.preventDefault();

    const companyName = e.target.companyName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const facebook = e.target.facebook.value;
    const whatsapp = e.target.whatsapp.value;
    const address = e.target.address.value;
    const insideDhaka = e.target.insideDhaka.value;
    const outsideDhaka = e.target.outsideDhaka.value;

    const info = {
      companyName,
      phone,
      email,
      facebook,
      whatsapp,
      address,
      shipping: {
        insideDhaka,
        outsideDhaka,
      },
    };

    if (id) {
      const res = await updateBusinessInfo({ id, info });
      if (res?.data?.success) {
        swal.fire("", "Business Info update Success", "success");
      } else {
        swal.fire("", "something went wrong!", "error");
        console.log(res);
      }
    } else {
      const res = await addBusinessInfo(info);
      if (res?.data?.success) {
        swal.fire("", "Business Info Add Success", "success");
      } else {
        swal.fire("", "something went wrong!", "error");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Business Info</h3>
      </div>

      <form className="p-4 text-neutral-content" onSubmit={hanldeAddUpdate}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div>
            <p className="mb-1">Company Name</p>
            <input
              type="text"
              name="companyName"
              required
              defaultValue={businessInfo?.companyName}
            />
          </div>
          <div>
            <p className="mb-1">Phone Number</p>
            <input
              type="text"
              name="phone"
              required
              defaultValue={businessInfo?.phone}
            />
          </div>

          <div>
            <p className="mb-1">Email</p>
            <input
              type="text"
              name="email"
              defaultValue={businessInfo?.email}
            />
          </div>
          <div>
            <p className="mb-1">Facebook</p>
            <input
              type="text"
              name="facebook"
              defaultValue={businessInfo?.facebook}
            />
          </div>
          <div>
            <p className="mb-1">Whatsapp</p>
            <input
              type="text"
              name="whatsapp"
              required
              defaultValue={businessInfo?.whatsapp}
            />
          </div>

          <div>
            <p className="mb-1">Address</p>
            <input
              type="text"
              name="address"
              required
              defaultValue={businessInfo?.address}
            />
          </div>
        </div>

        <div className="mt-4 border rounded p-3">
          <h3>Shipping Config</h3>

          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            <div>
              <p className="mb-1">Inside Dhaka</p>
              <input
                type="number"
                name="insideDhaka"
                defaultValue={businessInfo?.shipping?.insideDhaka}
              />
            </div>
            <div>
              <p className="mb-1">Outside Dhaka</p>
              <input
                type="number"
                name="outsideDhaka"
                defaultValue={businessInfo?.shipping?.outsideDhaka}
              />
            </div>
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
