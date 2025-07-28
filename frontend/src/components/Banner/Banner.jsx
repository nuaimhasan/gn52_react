import { useGetBannerQuery } from "../../Redux/banner/banner";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

export default function Banner() {
  const { data } = useGetBannerQuery();
  const banner = data?.data;

  return (
    <section className="py-4">
      <div className="container">
        <div className="flex flex-col gap-5 items-center">
          <div className="text-center">
            <h2 className="text-3xl sm:text-5xl text-primary font-bold">
              {banner?.title}
            </h2>
            <p className="sm:mt-2 sm:text-lg text-neutral/95 sm:mx-40">
              {banner?.description}
            </p>
          </div>

          <div className="w-full">
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={true}
              modules={[Autoplay, Pagination]}
              loop={true}
              grabCursor={true}
            >
              {banner?.galleries?.map((gallery) => (
                <SwiperSlide key={gallery?._id}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/banner/${
                      gallery?.url
                    }`}
                    alt={gallery?.title}
                    className="w-full sm:h-[420px] object-cover rounded hover:cursor-grab"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <a
              href="#order"
              className="bg-primary text-base-100 px-4 py-2 rounded"
            >
              এখানে অর্ডার করুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
