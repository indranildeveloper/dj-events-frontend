import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container mx-auto mt-auto py-6 flex flex-col items-center justify-center gap-2">
      <p>Copyright &copy; DJ Events 2023</p>
      <p>
        <Link href="/about" className="text-blue-500">
          About This Project
        </Link>
      </p>
      <p>
        Made with 💙 By{" "}
        <a
          href="https://github.com/indranildeveloper"
          target="_blank"
          rel="noopenner noreferrer"
          className="text-blue-500"
        >
          Indranil halder
        </a>
      </p>
    </footer>
  );
};

export default Footer;
