import { useGetAllFeatureQuery } from "../../Redux/feature/featureApi";
import { useGetFeatureSectionQuery } from "../../Redux/feature/featureSectionApi";

export default function Services() {
  const { data } = useGetAllFeatureQuery();
  const features = data?.data;

  const { data: section } = useGetFeatureSectionQuery();

  return (
    <section className="py-5 sm:py-10 bg-gray-50">
      <div className="container">
        <div className="text-center bg-primary text-base-100 text-xl py-2 rounded mb-3 ">
          <h2 className="font-semibold">{section?.data?.title}</h2>
        </div>

        <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-6">
          {features?.map((feature) => (
            <div key={feature?._id} className="feature-item p-3">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/feature/${
                  feature?.icon
                }`}
                alt=""
                className="w-12"
              />
              <h2 className="text-secondary font-semibold">{feature?.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
