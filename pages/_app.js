import { Poppins } from "@next/font/google";
import "@/styles/globals.css";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const App = ({ Component, pageProps }) => {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default App;
