import "./LandingPage.css";
import Navbar from "./NavBar/Navbar";
import Home from "./Home/Home";
import AboutUs from "./AboutUs/AboutUs";
import Subscription from "./Subscription/Subscription";
import FrequentQuestion from "./FrequentQuestion/FrequentQuestion";
import Footer from "./Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Home />
      </div>
      <div>
        <AboutUs />
      </div>
      <div>
        <Subscription />
      </div>
      <div className=" mt-[9.5rem]">
        <FrequentQuestion />
      </div>
      <div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
