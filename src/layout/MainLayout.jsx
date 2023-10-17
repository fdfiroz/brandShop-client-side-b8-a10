import { Outlet } from "react-router-dom"
import Navbar from "../Components/Header/Navbar/Navbar"

const MainLayout = () => {
  return (<>
    <Navbar></Navbar>
    <Outlet></Outlet>
  </>
  )
}

export default MainLayout