import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" value="Log In" className="btn" />
        </form>
        <p>
          Do not have an account?
          <Link href="/account/register"> Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
