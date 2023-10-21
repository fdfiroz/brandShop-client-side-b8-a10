import { Helmet } from "react-helmet-async";
import AboutSection from "../../Components/AboutSection/AboutSection"
import AdSlider from "../../Components/AdSlider/AdSlider";
import BrandHome from "../../Components/BrandHome/BrandHome";
import Header from "../../Components/Header/Header"


const Home = () => {
  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
      <Header/>
      <AboutSection/>
      <AdSlider/>
      <BrandHome/>
    </>
  );
};

export default Home;
