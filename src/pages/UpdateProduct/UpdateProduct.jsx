import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom"

const UpdateProduct = () => {
  const [data] = useLoaderData()
  const {uid, _id, name, brandName, category, description, image, rating, price, suggestion} = data
    const [newRating, setNewRating] = useState(rating);
    const [newSuggestion, setNewSuggestion] = useState(suggestion);
    const navigate = useNavigate();

    const handelChange = (e) => {
      setNewRating(e.target.value);
    }

    const handelSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value.trim();
      const brandName = form.brandName.value.trim();
      const description = form.description.value.trim();
      const category = form.category.value.trim();
      const price = form.price.value.trim();
      const image = form.image.value.trim();

      const product = {
        uid,
        name,
        brandName,
        description,
        category,
        price,
        image,
        rating: newRating,
        suggestion:newSuggestion
      };
      if (price < 0) {
        toast.error("Price can not be negative");
        return;
      }
      if (newRating < 0) {
        toast.error("Please add Rating");
        return;
      }
      axios.put(`https://brand-shop-server-side-fdfiroz.vercel.app/update-product/${_id}`, product)
        .then(res => {
          if (res.data.modifiedCount > 0) {
            toast.success("Product updated successfully");
            navigate("/my-all-product");
          }
        })
        .catch(error => {
          console.log(error.message);
          toast.error("Product not updated");
        });
    }

  return (
    <>
    <Helmet>
      <title>{name} | Update Product</title>
    </Helmet>
    <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Add Product</h1>
    <form onSubmit={handelSubmit} className="form-control w-full max-w-xs mx-auto ">
        <label className="label">
            <span className="label-text" >Product Name</span>
        </label>
        <input defaultValue={name} type="text" name="name" placeholder="Type here" required className="input input-bordered w-full max-w-xs" />

        <label className="label">
            <span className="label-text">Brand Name</span>
        </label>
        <input defaultValue={brandName} type="text" name="brandName" placeholder="Type here" required className="input input-bordered w-full max-w-xs" />

        <label className="label">
            <span className="label-text">Image Link</span>
        </label>
        <input defaultValue={image} type="text" placeholder="Type here" name="image" className="input input-bordered w-full max-w-xs" />
        <label className="label">
            <span className="label-text">Category</span>
            <span className="label-text-alt">Please Select</span>
        </label>
        <select name="category" className="select select-bordered" required defaultValue={category}>
          <option value="Car">Car</option>
          <option value="Motorcycle">Motorcycle</option>
        </select>
        <label className="label">
            <span className="label-text">Product Price</span>
        </label>
        <input defaultValue={price} type="number" placeholder="Type here" name="price" className="input input-bordered w-full max-w-xs" />
        <label className="label">
            <span className="label-text">Product Short Description</span>
        </label>
        <textarea defaultValue={description} placeholder="Bio" name="description" className="textarea textarea-bordered textarea-xs w-full max-w-xs" ></textarea>
        <div className="rating my-4" onChange={handelChange}>
          <input type="radio" name="rating" value="1" className="mask mask-star-2 bg-orange-400" defaultChecked={newRating === "1"} />
          <input type="radio" name="rating" value="2" className="mask mask-star-2 bg-orange-400" defaultChecked={newRating === "2"} />
          <input type="radio" name="rating" value="3" className="mask mask-star-2 bg-orange-400" defaultChecked={newRating === "3"} />
          <input type="radio" name="rating" value="4" className="mask mask-star-2 bg-orange-400" defaultChecked={newRating === "4"} />
          <input type="radio" name="rating" value="5" className="mask mask-star-2 bg-orange-400" defaultChecked={newRating === "5"} />
        </div>
        <label className="label cursor-pointer">
          <span className="label-text">Want to Run ad</span>
          <input onChange={()=>setNewSuggestion(!newSuggestion)} type="checkbox" value="true" defaultChecked={newSuggestion} className="toggle" />
        </label>
        <input type="submit" value="Submit" className="btn btn-primary" />
    </form>
    </div>
    </>
)
}

export default UpdateProduct