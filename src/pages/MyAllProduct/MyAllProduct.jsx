import axios from "axios"
import { useEffect } from "react"
import MyProductCard from "../../Components/MyProductCard/MyProductCard"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"
import Swal from "sweetalert2"
import NoDataFound from "../../Components/NoDataFound/NoDataFound"
import toast from "react-hot-toast"

const MyAllProduct = () => {
  const {user, loading} = useAuth()
  const [productsData, setProductsData] = useState([])
useEffect(() => {
  axios.get(`https://brand-shop-server-side-fdfiroz.vercel.app/products/${user?.uid}`)
  .then((res) => {
    console.log(res)
    setProductsData(res.data)
  })
  .catch((err) => {
    console.log(err);
  }) 
}, [user?.uid])

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
    axios.delete(`https://brand-shop-server-side-fdfiroz.vercel.app/product/${id}`)
    .then((res) => {
      if(res.data.deletedCount > 0){
        toast.success('Deleted successfully!')
        const remainingProduct = productsData.filter(user => user._id !== id);
        setProductsData(remainingProduct);
      }
    })
  } else if (result.isDenied) {
    toast.error('Product not Deleted', '', 'info')
  }
})
}

  return (
    <>
    {
      productsData?.length === 0 ? <NoDataFound></NoDataFound> :
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {
        productsData?.map((data) => <MyProductCard key={data._id} data={data} handleDelete={handleDelete}></MyProductCard>)
      }
      </div>
    }
    </>
   
  )
}

export default MyAllProduct