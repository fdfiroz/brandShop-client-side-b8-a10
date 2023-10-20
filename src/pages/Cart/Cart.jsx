import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import axios from "axios"
import NoDataFound from "../../Components/NoDataFound/NoDataFound"
import CartCard from "../../Components/CartCard/CartCard"
import toast from "react-hot-toast"

const Cart = () => {
    const {user, loading} = useAuth()
    const [cartData, setCartData] = useState([])
    useEffect(() => {
        axios.post(`http://localhost:5000/cart/${user?.email}`)
            .then((res) => {
                setCartData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [loading, user?.email ])

    const handelBuyAll = () => {
        axios.delete(`http://localhost:5000/cart-all/${user?.email}`)
            .then((res) => {
                console.log(res.data)
                if (res.data.length === 0) {
                    toast.success("Thanks For Buying");
                    const remainingProduct = cartData.filter((user) => user.email !== user?.email);
                    setCartData(remainingProduct);
                }
            })
            .catch((err) => {
                toast.error(err.message);
                console.log(err);
            });
    }
  return (
    <div>
        {
            cartData===0 ? <NoDataFound></NoDataFound> : 
           <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    cartData?.map((data) => <CartCard key={data._id} data={data}></CartCard>)
                }
            </div>
            <div className="flex items-center justify-end gap-8 py-10">
                <h1 className="text-lg font-bold">Total Price: {cartData.reduce((acc, curr) => acc + parseInt(curr.price), 0)} TK</h1>
                <button onClick={handelBuyAll} className="btn btn-primary">Buy All</button>
            </div>
           </div>
        }
    </div>
  )
}

export default Cart