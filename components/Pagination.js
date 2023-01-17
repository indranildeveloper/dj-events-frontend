import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PER_PAGE } from "@/config/index";

const Pagination = ({ page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <div className="flex items-center mt-4 gap-8">
      {page > 1 && (
        <Link
          className="flex items-center gap-2 border-2 border-gray-800 px-4 py-1 rounded-md transition-all hover:text-white hover:bg-gray-800"
          href={`/events?page=${page - 1}`}
        >
          <FaArrowLeft />
          Previous
        </Link>
      )}
      {page < lastPage && (
        <Link
          className="flex items-center gap-2 border-2 border-gray-800 px-4 py-1 rounded-md transition-all hover:text-white hover:bg-gray-800"
          href={`/events?page=${page + 1}`}
        >
          Next <FaArrowRight />
        </Link>
      )}
    </div>
  );
};
export default Pagination;
