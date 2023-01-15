import { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <div>
      <form className="relative border" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="border-2 px-6 py-3 border-gray-500 rounded-md w-80 outline-none transition-all duration-300 focus:border-blue-500 focus:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Events"
        />
        <button type="submit">
          <FaSearch className="absolute top-1/2 right-6 -translate-y-1/2" />
        </button>
      </form>
    </div>
  );
};

export default Search;
