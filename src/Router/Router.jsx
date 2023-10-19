import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import AddProduct from "../pages/AddProduct/AddProduct";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Profile from "../pages/Profile/Profile";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import MyAllProduct from "../pages/MyAllProduct/MyAllProduct";
import Bikes from "../pages/Bikes/Bikes";
import Cars from "../pages/Cars/Cars";
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
            {
                path : "login",
                element: <Login></Login>,
            },
            {
                path : "register",
                element: <Register></Register>
            },
            {
                path: "add-product",
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute> 
            },
            {
                path: "update-product/:id",
                element: <PrivateRoute><UpdateProduct /></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/product/${params.id}`),
            },

            {
                path: "my-all-product",
                element: <PrivateRoute><MyAllProduct></MyAllProduct></PrivateRoute>
            },
            {
                path: "profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "bikes",
                element: <Bikes></Bikes>,
                loader: () => fetch("http://localhost:5000/motorcycles"),
            },
            {
                path:"cars",
                element: <Cars></Cars>,
            },
           



            
        ]

    }
])

export default myCreatedRoute