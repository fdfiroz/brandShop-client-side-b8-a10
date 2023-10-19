import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Headroom from "react-headroom";
import CartBtn from "../CartBtn/CartBtn";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const menus = [
    <li key={1}>
      <NavLink to={"/"}>Home</NavLink>
    </li>,
    <li key={2}>
      <NavLink to={"/cars"}>Cars</NavLink>
    </li>,
    <li key={3}>
      <NavLink to={"/bikes"}>Bikes</NavLink>
    </li>,
  ];
  return (
    <>
      <Headroom>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {menus}
                <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        
      </div>
              </ul>
            </div>
            <Link to={"/"} className="btn btn-ghost normal-case text-xl"><img className="w-auto h-3/4" src="/logo.png" alt="" /></Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 justify-around">
              {menus}
             
            </ul>
          </div>
          
          <div className="navbar-end">
          
          <CartBtn />
            {user?.email ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[100] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <NavLink to={"/profile"} className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/add-product"}>Add Product</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/my-all-product"} className="justify-between">
                      My All Products
                    </NavLink>
                  </li>
                  <li onClick={logOut}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={"/login"} className="btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </Headroom>
    </>
  );
};

export default Navbar;
