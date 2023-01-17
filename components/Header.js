import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";

const Header = () => {
  return (
    <header className="shadow-md">
      <div className="container mx-auto flex justify-between items-center h-20">
        <div className="logo">
          <Link href="/" className="text-xl transition-all hover:text-blue-500">
            DJ Events
          </Link>
        </div>

        <Search />

        <nav>
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link
                href="/events"
                className="transition-all hover:text-blue-500"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/events/add"
                className="transition-all hover:text-blue-500"
              >
                Add Event
              </Link>
            </li>
            <li>
              <Link
                href="/account/login"
                className="flex items-center gap-2 border-2 border-blue-500 text-blue-500 px-8 py-2 rounded-md transition-all hover:text-white hover:bg-blue-500"
              >
                <FaSignInAlt /> Log In
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
