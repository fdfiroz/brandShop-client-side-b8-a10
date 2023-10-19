import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
const Header = () => {
  const settings = {
    dots: true,
    useCSS:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
    adaptiveHeight:true,
    lazyLoad: true,
    slickPrev: true,
    slickNext:true,
  };
  return (
    <>
        <Slider {...settings}>
          <div>
            <img  src="/banner-1.jpg" />
          </div>
          <div>
            <img src="/banner-2.jpg" />
          </div>
          <div>
            <img src="/banner-3.jpg" />
          </div>
          
        </Slider>
    
  
  </>
  )
}

export default Header