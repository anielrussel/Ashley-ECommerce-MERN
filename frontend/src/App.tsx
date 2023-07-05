import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setProductData } from "./redux/productSlice";
import ScrollToTop from "./utils/ScrollToTop";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const initialOptions = {
    clientId:
      "AUEj7gBJTAbIDA8JZIQr3u4TODdL_JMcbN28c9bHsSBZhIfJp4a2HYQyIaQ-XDcITRMgCpNP7vEf-hM2",
    currency: "USD",
    intent: "capture",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://ashley-e-commerce.onrender.com/product"
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const resData = await res.json();
        dispatch(setProductData(resData));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
        <Toaster />
        <div>
          <ScrollToTop />
          <div className="relative z-20">
            <Navbar />
          </div>
          <main className="bg-[#EBF1D6] min-h-[calc(100vh)] relative z-10">
            <Outlet />
          </main>
        </div>
      </PayPalScriptProvider>
    </>
  );
}

export default App;
