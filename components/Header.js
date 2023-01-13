import Link from "next/link";

const Header = () => {
  return (
    <header className="shadow-md">
      <div className="container mx-auto flex justify-between items-center h-20">
        <div className="logo">
          <Link href="/" className="text-xl transition-all hover:text-blue-500">
            DJ Events
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link
                href="/events"
                className="transition-all hover:text-blue-500"
              >
                Events
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
