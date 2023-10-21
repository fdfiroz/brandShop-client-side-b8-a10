import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


// eslint-disable-next-line no-unused-vars


const AdSlider = () => {
    const [newData, setNewData] = useState([])

    useEffect(() => {
        axios.get("https://brand-shop-server-side-fdfiroz.vercel.app/suggestion-products")
            .then((res) => {
                setNewData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const settings = {
        useCSS: true,
        className: " bg-gray-100",
        // centerMode: true,

        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay:true,
        autoplaySpeed: 2000,
        adaptiveHeight: true,
        lazyLoad: true,
        slickPrev: true,
        slickNext: true,
    };
    return (
        <>
            <div className="my-8">
                <h1 className="text-xl font-bold py-8">Our New Unlash</h1>
                <Slider  {...settings}>
                    {
                        newData.map((item, index) => {
                            return (
                                <Link to={`/product-detail/${newData[index]._id}`} className="carousel-item w-1/2"  key={index}>
                                    <div className="card w-96 bg-base-100 h-52 shadow-xl image-full">
                                        <figure><img src={item.image} alt="Shoes" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title justify-center">{item.name}</h2>
                                            <p>{item.description.slice(0, 56)}....</p>
                                            {/* <div className="card-actions justify-end">
                                            </div> */}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    }

                </Slider>
            </div>
        </>
    )
}


export default AdSlider