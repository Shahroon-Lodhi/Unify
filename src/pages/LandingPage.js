import './LandingPage.css';
import heroImg from '../components/Assets/heroImg.png';
import inventoryIcon from '../components/Assets/inventoryIcon.png';
import listingIcon from '../components/Assets/listingIcon.png';
import refundIcon from '../components/Assets/refundIcon.png';
import adIcon from '../components/Assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo"><span className="logo-text">
              Unify <span className="pos-text">TM</span>
            </span></div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#integrations">Integrations</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="/login">Log in</a></li>
          <li><button className="btn-outline" onClick={() => navigate('/signup')}>Sign up</button></li>
          <li><button className="btn-orange">Book a demo</button></li>
        </ul>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Streamline Multichannel<br />E-Commerce Management</h1>
          <p>Centralize operations with real-time inventory and simplified product listings.</p>
          <div className="cta-buttons">
            <button className="btn-orange">Book a demo</button>
            <button className="btn-outline">Download brochure</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Dashboard Overview" />
        </div>
      </section>

      <section id="features" className="features-grid">
        <div className="feature-card">
          <img src={inventoryIcon} alt="Inventory Icon" />
          <p>Centralized Inventory</p>
        </div>
        <div className="feature-card">
          <img src={listingIcon} alt="Product Listing Icon" />
          <p>Simultaneous Product Listing</p>
        </div>
        <div className="feature-card">
          <img src={refundIcon} alt="Refund Tracking Icon" />
          <p>Refund Tracking System</p>
        </div>
        <div className="feature-card">
          <img src={adIcon} alt="Advertisement Icon" />
          <p>Advertisement</p>
        </div>
      </section>
        <section id="integrations" className="integrations-section">
    <h2>Popular Integrations</h2>
    <div className="integration-slider">
        <div className="integration-track">
        <img src={require('../components/Assets/shopify.png')} alt="Shopify" />
        <img src={require('../components/Assets/woocommerce.png')} alt="WooCommerce" />
        <img src={require('../components/Assets/daraz.png')} alt="Daraz" />
        {/* Duplicate for seamless loop */}
        <img src={require('../components/Assets/shopify.png')} alt="Shopify" />
        <img src={require('../components/Assets/woocommerce.png')} alt="WooCommerce" />
        <img src={require('../components/Assets/daraz.png')} alt="Daraz" />
                <img src={require('../components/Assets/shopify.png')} alt="Shopify" />
        <img src={require('../components/Assets/woocommerce.png')} alt="WooCommerce" />
        <img src={require('../components/Assets/daraz.png')} alt="Daraz" />
                <img src={require('../components/Assets/shopify.png')} alt="Shopify" />
        <img src={require('../components/Assets/woocommerce.png')} alt="WooCommerce" />
        <img src={require('../components/Assets/daraz.png')} alt="Daraz" />
                <img src={require('../components/Assets/shopify.png')} alt="Shopify" />
        <img src={require('../components/Assets/woocommerce.png')} alt="WooCommerce" />
        <img src={require('../components/Assets/daraz.png')} alt="Daraz" />
        </div>
    </div>
    </section>
    </div>
  );
};

export default LandingPage;
