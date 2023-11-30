import "./LandingPage.css";
import Home from "./Home/Home";
import AboutUs from "./AboutUs/AboutUs";
import Subscription from "./Subscription/Subscription";
import FrequentQuestion from "./FrequentQuestion/FrequentQuestion";
import Footer from "./Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <div id="home">
        <Home />
      </div>
      <div id="about-us">
        <AboutUs />
      </div>
      <div id="subscription">
        <Subscription />
      </div>
      <div id="faq" className="mt-[9.5rem]">
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
