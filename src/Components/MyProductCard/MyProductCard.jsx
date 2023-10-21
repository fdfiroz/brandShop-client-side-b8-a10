/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const MyProductCard = ({data, handleDelete}) => {
    const { _id, name, brandName, category, description, image, rating, price } = data
    return (
        
        <div className="card w-96 bg-base-100 h-auto shadow-xl">
            <Link to={`/product-detail/${_id}`} className="px-2 pt-2 object-center w-80 h-72 mx-auto tooltip" data-tip="View Detail">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </Link>

            <div className="card-body items-center justify-items-center text-center py-2 px-2">
                <div className="flex gap-4">
                    <div className="badge mx-auto bg-slate-200">{brandName}</div>
                    <div className="badge mx-auto bg-slate-200">{category}</div>
                </div>
                <h2 className="text-lg font-bold">{name}</h2>

                <Link to={`/product-detail/${_id}`} className="text-base self-center tooltip" data-tip="View Detail">{description.slice(0, 100)} ...</Link>
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
                <div className="flex gap-3">
                <Link to={`/update-product/${_id}`} className="card-actions">
                    <button className="btn btn-primary capitalize rounded-sm">Update Product</button>
                </Link>
                <button onClick={()=>handleDelete(_id)} className="btn btn-primary capitalize rounded-sm tooltip lg:tooltip" data-tip="Delete">X</button>
                </div>
            </div>
        </div>
    )
}

export default MyProductCard