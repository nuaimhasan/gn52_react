import { useGetBannerQuery } from "../../Redux/banner/banner";
import parse from "html-react-parser";

export default function Banner() {
  const { data } = useGetBannerQuery();
  const banner = data?.data[0];

  const video = banner?.videoLink && parse(banner?.videoLink);

  return (
    <section className="pt-4 sm:pt-0 pb-4">
      <div className="container">
        <div className="sm:mt-6 flex flex-col items-center gap-4 text-center">
          <h2 className="sm:w-3/4 text-xl sm:text-3xl text-primary font-bold">
            {banner?.title}
          </h2>
          <p className="sm:w-3/4 mx-auto text-sm sm:text-base font-medium">
            {banner?.description}
          </p>
        </div>

        <div className="mt-4 flex justify-center">{video}</div>

        <div className="mt-4 flex justify-center">
          <a
            href="#order"
            className="bg-primary text-base-100 px-4 py-2 rounded"
          >
            এখানে অর্ডার করুন
          </a>
        </div>
      </div>
    </section>
  );
}
