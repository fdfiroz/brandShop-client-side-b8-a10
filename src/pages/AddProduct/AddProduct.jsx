import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
    const {user} = useAuth();
    const uid = user.uid;
    const [rating, setRating] = useState(0);
    const [suggestion, setSuggestion] = useState(false);
    const handelChange = (e) => {
        setRating(e.target.value);
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        console.log(form)
        const name = form.name.value;
        const brandName = form.brandName.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = form.price.value;
        const image = form.image.value;

        const product = {
            uid,
            name,
            brandName,
            description,
            category,
            price,
            image,
            rating,
            suggestion
        };
        if (price < 0) {
            toast.error("Price can not be negative");
            return;
        }
        if (rating < 0) {
            toast.error("Please add Rating");
            return;
        }
        axios.post("http://localhost:5000/product", product)
            .then(res => {
                console.log(res);
                if (res.data.insertedId) {
                    toast.success("Product added successfully");
                }
            })
            .catch(error => {
                console.log(error.message);
                toast.error("Product not added");
            });



    }
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Add Product</h1>
        <form onSubmit={handelSubmit} className="form-control w-full max-w-xs mx-auto ">
            <label className="label">
                <span className="label-text" >Product Name</span>
            </label>
            <input type="text" name="name" placeholder="Type here" required className="input input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Brand Name</span>
            </label>
            <input type="text" name="brandName" placeholder="Type here" required className="input input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Image Link</span>
            </label>
            <input type="text" placeholder="Type here" name="image" className="input input-bordered w-full max-w-xs" />
            <label className="label">
                <span className="label-text">Category</span>
                <span className="label-text-alt">Please Select</span>
            </label>
            <select name="category" className="select select-bordered" required>
                <option value="Car">Car</option>
                <option value="Motorcycle">Motorcycle</option>
            </select>
            <label className="label">
                <span className="label-text">Product Price</span>
            </label>
            <input type="number" placeholder="Type here" name="price" className="input input-bordered w-full max-w-xs" />
            <label className="label">
                <span className="label-text">Product Short Description</span>
            </label>
            <textarea placeholder="Bio" name="description" className="textarea textarea-bordered textarea-xs w-full max-w-xs" ></textarea>
            <div className="rating my-4" onChange={handelChange}>
                <input type="radio" name="rating" value="1" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating" value="2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating" value="3" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating" value="4" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating" value="5" className="mask mask-star-2 bg-orange-400" />
            </div>
            <label className="label cursor-pointer">
                <span className="label-text">Want to Run ad</span>
                <input onChange={()=>setSuggestion(!suggestion)} type="checkbox"  className="toggle" />
            </label>
            <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
        </div>
    )
}

export default AddProduct