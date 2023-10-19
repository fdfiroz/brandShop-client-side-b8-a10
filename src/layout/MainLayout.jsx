import { Outlet } from "react-router-dom"
import Navbar from "../Components/Header/Navbar/Navbar"
import { Toaster } from "react-hot-toast"


const MainLayout = () => {

  return (<>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Toaster/>
  </>
  )
}

export default MainLayout