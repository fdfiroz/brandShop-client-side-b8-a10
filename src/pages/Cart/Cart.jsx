import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import axios from "axios"
import NoDataFound from "../../Components/NoDataFound/NoDataFound"
import CartCard from "../../Components/CartCard/CartCard"
import toast from "react-hot-toast"
import Swal from "sweetalert2"

const Cart = () => {
    const {user, loading} = useAuth()
    const [cartData, setCartData] = useState([])
    console.log(cartData)
    useEffect(() => {
        axios.get(`https://brand-shop-server-side-fdfiroz.vercel.app/cart/${user?.email}`)
            .then((res) => {
                setCartData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [loading, user?.email ])

    const handelBuyAll = () => {
        axios.delete(`https://brand-shop-server-side-fdfiroz.vercel.app/cart-all/${user?.email}`)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Thanks For Buying");
                    setCartData([]);
                }
            })
            .catch((err) => {
                toast.error(err.message);
                console.log(err);
            });
    }
    const handleDelete = id => {
        // make sure user is confirmed to delete
         
      Swal.fire({
        title: 'Do you want Delete?',
        showDenyButton: true,
        confirmButtonText: 'Yes, Delete it',
        denyButtonText: `No, don't Delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.delete(`https://brand-shop-server-side-fdfiroz.vercel.app/cart/${id}`)
          .then((res) => {
            if(res.data.deletedCount > 0){
              toast.success('Deleted successfully!')
              // remove the user from the UI
              const remainingProduct = cartData.filter(user => user._id !== id);
              setCartData(remainingProduct);
            }
          })
        } else if (result.isDenied) {
          toast.error('Product not Deleted')
        }
      })
      }

      const buyOne = id => {
        axios.delete(`https://brand-shop-server-side-fdfiroz.vercel.app/cart/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Thanks For Buying");
                    // remove the user from the UI
                    const remainingProduct = cartData.filter(user => user._id!== id);
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
            cartData.length === 0 ? <NoDataFound></NoDataFound> : 
           <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    cartData?.map((data) => <CartCard key={data._id} data={data} buyOne={buyOne} handleDelete={handleDelete}></CartCard>)
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