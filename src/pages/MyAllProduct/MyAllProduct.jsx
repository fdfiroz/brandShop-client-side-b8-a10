import axios from "axios"
import { useEffect } from "react"
import MyProductCard from "../../Components/MyProductCard/MyProductCard"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"

const MyAllProduct = () => {
  const {user, loading} = useAuth()
  const [productData, setProductData] = useState([])
useEffect(() => {
  axios.get(`http://localhost:5000/products/${user?.uid}`)
  .then((res) => {
    setProductData(res.data)
  })
  .catch((err) => {
    console.log(err);
  }) 
}, [loading])

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {
      productData?.map((data) => <MyProductCard key={data._id} data={data}></MyProductCard>)
    } 
    </div>
    </>
   
  )
}

export default MyAllProduct