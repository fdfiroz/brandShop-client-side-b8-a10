import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";

const myCreatedRoute =  createBrowserRouter([
    {

        path : "/",
        element : <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children : [
            {
                path : "/",
                element: <Home></Home>,
            
            },
        ]

    }
])

export default myCreatedRoute