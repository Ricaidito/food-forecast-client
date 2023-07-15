import "./LandingPage.css";
import Navbar from "./NavBar/Navbar";
import Home from "./Home/Home";
import AboutUs from "./AboutUs/AboutUs";
import Subscription from "./Subscription/Subscription";

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
    </div>
  );
};

export default LandingPage;
