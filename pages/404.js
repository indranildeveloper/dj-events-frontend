import Link from "next/link";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import Layout from "@/components/Layout";

const NotFoundPage = () => {
  return (
    <Layout title="Page Not Found">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-9xl flex items-center gap-8">
          <FaExclamationTriangle className="text-rose-600" /> 404
        </h1>
        <h4 className="text-4xl">Sorry! Page Not Found!</h4>
        <Link
          href="/"
          className="px-10 py-4 text-lg bg-blue-500 text-white rounded-md transition-all hover:bg-blue-600 flex items-center justify-center gap-4"
        >
          <FaArrowLeft /> Go Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
