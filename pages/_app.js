import { Poppins } from "@next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
};

export default App;
