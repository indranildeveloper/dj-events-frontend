import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="User Log In">
      <div className="border rounded-md shadow-md p-8 mx-auto w-full md:w-[40vw] ">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col my-4">
            <label htmlFor="email">Email Address</label>
            <input
              className="border-2 border-gray-500 p-2 rounded-md outline-none transition-all duration-300 focus:border-blue-500"
              type="email"
              id="emil"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-4">
            <label htmlFor="password">Password</label>
            <input
              className="border-2 border-gray-500 p-2 rounded-md outline-none transition-all duration-300 focus:border-blue-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="px-8 py-2 rounded-md border-2 border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white"
            type="submit"
          >
            Log In
          </button>
        </form>
        <p className="mt-4">
          Do not have an account?{" "}
          <Link className="text-blue-500" href="/account/register">
            Register
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
