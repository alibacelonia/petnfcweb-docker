import { useEffect } from "react";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import { ImSpinner10 } from "react-icons/im";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.remove();
    }
  }, []);

  return (
    <main className={`${poppins.variable} font-sans`}>
      <div
        id="globalLoader"
        className="min-h-screen flex flex-col items-center justify-center gap-2"
      ></div>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
