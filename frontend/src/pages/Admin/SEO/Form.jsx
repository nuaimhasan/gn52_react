import { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import {
  useAddSEOMutation,
  useUpdateSEOMutation,
} from "../../../Redux/seo/seoapi";
import Swal from "sweetalert2";

export default function Form({ seo }) {
  const [keywords, setKeywords] = useState([]);

  const id = seo?._id;

  const [addSEO, { isLoading }] = useAddSEOMutation();
  const [updateSEO, { isLoading: updateLoading }] = useUpdateSEOMutation();

  useEffect(() => {
    if (seo?.basic?.keywords) {
      setKeywords(seo?.basic?.keywords);
    }
  }, [seo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (keywords?.length < 1) {
      Swal.fire("", "Keywords is required", "warning");
      return;
    }

    const formData = new FormData(e.target);
    const data = {
      basic: {
        title: formData.get("title"),
        keywords: keywords,
        description: formData.get("description"),
        author: formData.get("author"),
        owner: formData.get("owner"),
        designer: formData.get("designer"),
        subject: formData.get("subject"),
        copyright: formData.get("copyright"),
        url: formData.get("url"),
      },
      og: {
        ogtitle: formData.get("ogtitle"),
        ogtype: formData.get("ogtype"),
        ogurl: formData.get("ogurl"),
        ogsitename: formData.get("ogsitename"),
        ogdescription: formData.get("ogdescription"),
        ogimage: formData.get("ogimage"),
      },
      custom: {
        facebook_domain_verification: formData.get(
          "facebook_domain_verification"
        ),
        google_site_verificatio: formData.get("google_site_verificatio"),
        google_tag_manager: formData.get("google_tag_manager"),
      },
    };

    if (!id) {
      try {
        const res = await addSEO(data);
        if (res?.data?.success) {
          Swal.fire("", "SEO data added successfully", "success");
        } else {
          Swal.fire("", "Failed to add SEO data", "error");
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await updateSEO({ data, id });
        if (res?.data?.success) {
          Swal.fire("", "SEO data updated successfully", "success");
        } else {
          Swal.fire("", "Failed to update SEO data", "error");
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 text-sm">
      <div>
        <p className="mb-2">Basic Meta Tags</p>
        <div className="grid sm:grid-cols-2 gap-3 border rounded p-3">
          <div>
            <p className="mb-1">Meta Title *</p>
            <input
              type="text"
              name="title"
              required
              defaultValue={seo?.basic?.title}
            />
          </div>
          <div>
            <p className="mb-1">keywords *</p>
            <TagsInput value={keywords} onChange={(tag) => setKeywords(tag)} />
          </div>
          <div className="sm:col-span-2">
            <p className="mb-1">Description *</p>
            <textarea
              name="description"
              required
              defaultValue={seo?.basic?.description}
            ></textarea>
          </div>
          <div>
            <p className="mb-1">Author</p>
            <input
              type="text"
              name="author"
              defaultValue={seo?.basic?.author}
            />
          </div>
          <div>
            <p className="mb-1">Owner</p>
            <input type="text" name="owner" defaultValue={seo?.basic?.owner} />
          </div>
          <div>
            <p className="mb-1">Designer</p>
            <input
              type="text"
              name="designer"
              defaultValue={seo?.basic?.designer}
            />
          </div>
          <div>
            <p className="mb-1">Subject</p>
            <input
              type="text"
              name="subject"
              defaultValue={seo?.basic?.subject}
            />
          </div>
          <div>
            <p className="mb-1">Copyright</p>
            <input
              type="text"
              name="copyright"
              defaultValue={seo?.basic?.copyright}
            />
          </div>
          <div>
            <p className="mb-1">URL</p>
            <input type="text" name="url" defaultValue={seo?.basic?.url} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2">OpenGraph Meta Tags</p>
        <div className="grid sm:grid-cols-2 gap-3 border rounded p-3">
          <div>
            <p className="mb-1">og title</p>
            <input type="text" name="ogtitle" defaultValue={seo?.og?.ogtitle} />
          </div>
          <div>
            <p className="mb-1">og:type</p>
            <input type="text" name="ogtype" defaultValue={seo?.og?.ogtype} />
          </div>
          <div className="sm:col-span-2">
            <p className="mb-1">og url</p>
            <textarea name="ogurl" defaultValue={seo?.og?.ogurl}></textarea>
          </div>
          <div>
            <p className="mb-1">og sitename</p>
            <input
              type="text"
              name="ogsitename"
              defaultValue={seo?.og?.ogsitename}
            />
          </div>
          <div>
            <p className="mb-1">og description</p>
            <input
              type="text"
              name="ogdescription"
              defaultValue={seo?.og?.ogdescription}
            />
          </div>
          <div>
            <p className="mb-1">og image url</p>
            <input type="text" name="ogimage" defaultValue={seo?.og?.ogimage} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2">Custom Tags</p>
        <div className="grid sm:grid-cols-2 gap-3 border rounded p-3">
          <div>
            <p className="mb-1">facebook-domain-verification Id</p>
            <input
              type="text"
              name="facebook_domain_verification"
              defaultValue={seo?.custom?.facebook_domain_verification}
            />
          </div>
          <div>
            <p className="mb-1">google-site-verificatio Id</p>
            <input
              type="text"
              name="google_site_verificatio"
              defaultValue={seo?.custom?.google_site_verificatio}
            />
          </div>
          <div>
            <p className="mb-1">google tag manager Id</p>
            <input
              type="text"
              name="google_tag_manager"
              defaultValue={seo?.custom?.google_tag_manager}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          disabled={(isLoading || updateLoading) && "disabled"}
          className="primary_btn"
        >
          {isLoading || updateLoading ? "laoding..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
