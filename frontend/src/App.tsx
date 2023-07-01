import { useEffect } from "react"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setProductData } from "./redux/productSlice";
import ScrollToTop from "./utils/ScrollToTop";


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://ashley-e-commerce.onrender.com/product");
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const resData = await res.json();
        dispatch(setProductData(resData))
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);


  return (
    <>
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
    </>
  )
}

export default App
