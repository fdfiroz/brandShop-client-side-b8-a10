
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

export const ProductDetail = () => {
    const product = useLoaderData();
    const { brandName, category, name, description, price, rating, _id } = product[0];

    const handelCart = () => {
        console.log("Add to cart clicked");
    };

    return (
        <>
        <Helmet>
            <title>{name} | Brand Shop</title>
        </Helmet>
        <div className="mx-auto h-full  my-10">
            <div className="flex flex-col items-center justify-center h-6/12">
                <figure>
                <img className="image-full" src={product[0].image} alt="" />
                </figure>
            </div>

           <div className=" px-16 flex flex-col items-start text-start gap-4 h-6/12">
           <div className="inline-flex items-center gap-2">
                <div className="badge mx-auto bg-slate-200">{brandName}</div>
                <div className="badge mx-auto bg-slate-200">{category}</div>
            </div>
            <h2 className="text-lg font-bold">{name}</h2>

            <p className="text-base">{description}</p>
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
            <div className="">
                <button onClick={handelCart} className="btn btn-primary">
                    Add To Cart
                </button>
            </div>
           </div>
        </div></>
    );
};
