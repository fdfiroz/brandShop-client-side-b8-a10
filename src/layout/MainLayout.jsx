import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar/Navbar"
import { Toaster } from "react-hot-toast"
import Footer from "../Components/Footer/Footer"


const MainLayout = () => {

  return (<>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer/>
    <Toaster/>
  </>
  )
}

export default MainLayout