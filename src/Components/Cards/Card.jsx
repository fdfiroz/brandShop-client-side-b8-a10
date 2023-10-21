import axios from "axios"
import useAuth from "../../hooks/useAuth"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

const Card = ({ data }) => {
    const {user} = useAuth()
    const { _id, name, brandName, category, description, image, rating, price } = data
    const cartData = {
        email: user?.email || '',
        productId: _id,
        name, 
        brandName, 
        category, 
        description, 
        image, 
        rating, 
        price
    }
    const handelCart = () => {
        if (!user?.email) {
            toast.error("Please Login First");
            return;
        } else {
            axios.get(`https://brand-shop-server-side-fdfiroz.vercel.app/cart/${user?.email}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        const findProduct = res.data.find((product) => product.productId === _id);
                        if (findProduct) {
                            toast.error("Product Already Added To Cart");
                        } else {
                            axios.post("https://brand-shop-server-side-fdfiroz.vercel.app/cart", cartData)
                                .then((res) => {
                                    console.log(res);
                                    if (res.data.insertedId) {
                                        toast.success("Product Added To Cart");
                                    }
                                })
                                .catch((err) => {
                                    toast.error(err.message);
                                });
                        }
                    } else {
                        axios.post("https://brand-shop-server-side-fdfiroz.vercel.app/cart", cartData)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    toast.success("Product Added To Cart");
                                }
                            })
                            .catch((err) => {
                                toast.error(err.message);
                            });
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        }
    };
    return (
        <div className="card w-96 bg-base-100 h-auto shadow-xl">
            <figure className="px-2 pt-2 object-center w-80 h-72 mx-auto image-full">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>

            <div className="card-body items-center justify-items-center text-center py-2 px-2">
                <div className="flex gap-4">
                    <Link to={`/brand/${brandName}`} className="badge mx-auto bg-slate-200">{brandName}</Link>
                    <div className="badge mx-auto bg-slate-200">{category}</div>
                </div>
                <h2 className="text-lg font-bold">{name}</h2>

                <p to={`/product-detail/${_id}`} className="text-base">{description.slice(0, 100)} ...</p>
                <h5 className="font-medium">Taka: {price}/-</h5>
               <div className="inline-flex items-center gap-2">
               <div className="rating" disabled>
                    {[1, 2, 3, 4, 5].map((starValue) => (
                        <input
                            key={starValue}
                            type="radio"
                            name={_id}
                            className="mask mask-star"
                            checked={starValue <= rating}
                            readOnly
                        />
                    ))}
                </div>
                <div className="font-bold">{rating}/5</div>
               </div>
                <div className="card-actions">
                    <Link to={`/product-detail/${_id}`} className="btn btn-primary">Detail</Link>
                    <button onClick={handelCart} className="btn btn-primary">Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card