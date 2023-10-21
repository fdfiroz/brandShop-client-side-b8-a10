import axios from "axios"
import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"
import { Link } from "react-router-dom"

const CartBtn = () => {
    const {user, loading} = useAuth()
    const [cartData, setCartData] = useState([])
    const total = cartData.reduce((acc, curr) => acc + parseInt(curr.price), 0);
    useEffect(() => {
        axios.get(`https://brand-shop-server-side-fdfiroz.vercel.app/cart/${user?.email}`)
            .then((res) => {
                setCartData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ loading, user?.uid])
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">{cartData.length}</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">{cartData.length} Items</span>
          <span className="text-info">Subtotal: ${total}</span>
          <div className="card-actions">
            <Link to={"/cart"}>
            <button className="btn btn-primary btn-block bg-base-300">View cart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartBtn