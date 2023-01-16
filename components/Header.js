import Link from "next/link";
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
