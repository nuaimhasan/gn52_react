import { Link } from "react-router-dom";
import { BiLogoFacebook } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { useGetBusinessQuery } from "../../Redux/businessInfo/businessInfo";

export default function Footer() {

  const {data} = useGetBusinessQuery()

  const contactInfo= data?.data[0]  

  return (
    <footer className="border-t py-5 bg-primary">
      <div className="container">
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-white font-light">
            Copyright © 2024 {contactInfo?.companyName}. All rights reserved. Powered by{" "}
            <Link
              to="https://emanagerit.com"
              target="_blank"
              className="underline"
            >
              eManager IT
            </Link>
          </p>

          <div className="flex gap-3 items-center">
            <Link
              to={contactInfo?.facebook}
              target="_blank"
              className="w-7 h-7 rounded-full bg-base-100 flex justify-center items-center text-primary hover:-mt-1 duration-200"
            >
              <BiLogoFacebook className="text-xl" />
            </Link>

            <Link
              to={`https://api.whatsapp.com/send?phone=${contactInfo?.whatsapp}`}
              target="_blank"
              className="w-7 h-7 rounded-full bg-base-100 flex justify-center items-center text-primary hover:-mt-1 duration-200"
            >
              <FaWhatsapp className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
