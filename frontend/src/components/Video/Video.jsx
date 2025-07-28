import parse from "html-react-parser";
import { useGetBannerQuery } from "../../Redux/banner/banner";

export default function Video() {
  const { data } = useGetBannerQuery();
  const banner = data?.data;

  return (
    <div className="flex justify-center py-5">
      {banner?.video && parse(banner?.video)}
    </div>
  );
}
