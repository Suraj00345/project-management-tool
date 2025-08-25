import { Link } from "react-router-dom";

const PageHeading = () => {
  return (
    <section className="flex flex-wrap items-start justify-between gap-4 ">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-2">Manage your profile information and account security</p>
      </div>

      <Link to="/" className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300">
        Go Back
      </Link>
    </section>
  );
};

export default PageHeading;
