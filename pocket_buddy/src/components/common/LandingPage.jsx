import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../../assets/landingPage.css"


const images = [
  "https://media.istockphoto.com/id/1149135424/photo/group-of-sweet-and-salty-snacks-perfect-for-binge-watching.webp?a=1&b=1&s=612x612&w=0&k=20&c=Fb-tmjfLTQaBHgBiVvKY9lYadeMsmzOSXkr2epG43sA=",
  "https://images.unsplash.com/photo-1496412705862-e0088f16f791?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHwwfDB8fHwy",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHwwfDB8fHwy",
  "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2R8ZW58MHwwfDB8fHwy",
  "https://media.istockphoto.com/id/1156130293/photo/group-of-gujarati-snacks-like-jalebi-fafda-thepla-khaman-dhokla-aloo-bhujiya-khandvi-khakra.jpg?b=1&s=612x612&w=0&k=20&c=BTCgRdb1QsnP7xW81ET7osNb3DCx2q5PpGsunqywpyM=",
  "https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGZvb2R8ZW58MHwwfDB8fHwy"
];


const LandingPage = () => {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
        <div className="landing-container">
          {/* Navbar */}
          <nav className="navbar">
            <Link className="navbar-brand" to="/" style={{color:'white',fontSize:30}}>
              🍽️ Pocket Buddy
            </Link>
            <div className="nav-buttons">
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/signup" className="btn signup-btn">Signup</Link>
            </div>
          </nav>

          <div className="slider-container">
            <img src={images[index]} alt="slide" className="slide" />
            <div className="hero-overlay">
              <h2 className="hero-title">Delicious Food !</h2>
              <p className="hero-subtitle">the best restaurants in town and enjoy mouth-watering meals at our restaurants</p>
            </div>
          </div>
    
          {/* Hero Section */}
          {/* <header className="hero">
            <div className="hero-overlay">
              <h2 className="hero-title">Delicious Food, Delivered Fast!</h2>
              <p className="hero-subtitle">Order from the best restaurants in town and enjoy mouth-watering meals at your doorstep.</p>
            </div>
          </header> */}
    
          {/* About Us */}

          <section className="about">
              <h2 className="section-title">About Us</h2>
              <p className="section-text">
                Welcome to <strong>Pocket Buddy</strong>, your ultimate destination for delicious dining experiences! 
                We partner with the best restaurants to bring you a wide variety of mouth-watering cuisines, all available at your fingertips.
              </p>
              
              <div className="about-content">
                <div className="about-text">
                  <h3>Our Story</h3>
                  <p>
                    Founded with a passion for food and technology, Pocket Buddy aims to make dining easy, enjoyable, and rewarding.
                    Whether you’re looking for a fine dining experience, a quick bite, or special discounts, we’ve got you covered!
                  </p>
                  
                  <h3>Why Choose Us?</h3>
                  <ul>
                    <li>🍽️ <strong>Wide Selection</strong>: Explore hundreds of restaurants and cuisines.</li>
                    <li>💰 <strong>Exclusive Discounts</strong>: Enjoy special offers and deals.</li>
                    <li>⭐ <strong>Customer Satisfaction</strong>: Rated highly by food lovers like you!</li>
                  </ul>
                </div>
              </div>
          </section>

    
          {/* Contact Us */}
          <section className="contact">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-text">Have questions? Reach out to us anytime.</p>
            <div className="contact-info">
              <p>📍 123 Food Street, Food City</p>
              <p>📧 support@pocketbuddy.com</p>
              <p>📞 +123 456 7890</p>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="footer">
            © 2025 Foodie Delight. All rights reserved.
          </footer>
        </div>

  )
}

export default LandingPage;
