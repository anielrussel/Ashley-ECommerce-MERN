import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
      <Toaster />
      <div>
        <Navbar />
        <main className="bg-[#EBF1D6] min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
