import React from "react";
import "../../assets/home.css"
import { Link } from "react-router-dom";

export const Home = () => {

    const restaurants = [
        // { id: 1, name: "Spicy Delight", offer: "Flat 20% Off", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQShjREOQwXY9pAbYdhOpYTJeWaj_Vyn4KkdA&s/300" },
        { id: 2, name: "Tasty Bites", offer: "Buy 1 Get 1 Free", image: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHwwfDB8fHwy/300" },
        { id: 3, name: "Food Haven", offer: "Free Dessert with Main Course", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHwwfDB8fHwy/300" },
        { id: 4, name: "The Grill House", offer: "Happy Hours 3PM - 6PM", image: "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2R8ZW58MHwwfDB8fHwy/300" },
      ];

      const role = localStorage.getItem("role"); // "ADMIN", "USER", or "OWNER"


  return (
    <div className="homepage">
      
      
      {/* Hero Section */}
      <header className="hero">
        <h2>Find the Best Restaurant Deals</h2>
        <p>Discover amazing discounts and offers from top restaurants near you.</p>
        {/* <input type="text" placeholder="Search restaurants or offers..." className="search-box" /> */}
      </header>
      
      {/* Featured Section */}
      <section className="featured">
        <h3>Exclusive Deals</h3>
        <Link to="/admin/myoffer" className="no-underline">
        <div className="featured-grid">
          <div className="featured-card">Special Combo Offer - 30% Off</div>
          <div className="featured-card">Weekend Buffet - Buy 1 Get 1 Free</div>
          <div className="featured-card">Late Night Discounts - 25% Off</div>
        </div>
        </Link>
      </section>
      
      {/* Restaurant Listings */}
      <section className="restaurant-list">
        <h3>Top Restaurants</h3>
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <div className="restaurant-card" key={restaurant.id}>
              <img src={restaurant.image} alt={restaurant.name} />
              <h4>{restaurant.name}</h4>
              <p className="offer">{restaurant.offer}</p>
              <Link to="/admin/myoffer">
              <button className="details-btn">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works">
        <h3>How It Works</h3>
        <ol>
          <li>Browse the best restaurant deals available.</li>
          <li>Click on an offer to view more details.</li>
          <li>Enjoy discounts when dining in or ordering online!</li>
        </ol>
      </section>
      
      {/* Testimonials */}
      <section className="testimonials">
        <h3>What Our Users Say</h3>
        <div className="testimonial-card">"Great platform! Found amazing deals on my favorite restaurants." - John Doe</div>
        <div className="testimonial-card">"Easy to use and so many discounts available!" - Sarah Lee</div>
        <div className="testimonial-card">"Highly recommended! Saves me a lot on dining out." - Mike Ross</div>
      </section>
      
      {/* Newsletter Section */}
      <section className="newsletter">
        <h3>Subscribe to Our Newsletter</h3>
        <p>Get the latest restaurant deals and discounts straight to your inbox.</p>
        <input type="email" placeholder="Enter your email..." className="newsletter-input" />
            <button className="subscribe-btn">Subscribe</button>
        
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <h4>About Us</h4>
            <p>We connect food lovers with the best restaurant deals in town.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            {/* <ul>
              <li><a href="/user/">Home</a></li>
              <li><a href="/user/myresto">Restaurants</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">FAQs</a></li>
            </ul> */}
            <ul>
  {/* Home for all roles */}
  <li><a href={`/${role.toLowerCase()}/`}></a></li>

  {/* USER-specific links */}
  {role === "USER" && (
    <>
    <li><a href="/user/">Home</a></li>
      <li><a href="/user/myresto">Restaurants</a></li>
      <li><a href="/user/contact">Contact</a></li>

    </>
  )}

  {/* OWNER-specific links */}
  {role === "OWNER" && (
    <>
    <li><a href="/owner/">Home</a></li>
    <li><a href="/owner/myresto">Restaurants</a></li>
    <li><a href="/admin/contact">Contact</a></li>
    </>
  )}

  {/* ADMIN-specific links */}
  {role === "ADMIN" && (
    <>
    <li><a href="/admin/">Home</a></li>
    <li><a href="/admin/myresto">Restaurants</a></li>
    <li><a href="/admin/contact">Contact</a></li>
    </>
  )}

  {/* Common links */}
  <li><a href="#">FAQs</a></li>
</ul>

            
          </div>
          <div>
            <h4>Follow Us</h4>
            <ul>
            <li><a href="#"><i class="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="#"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email: support@pocketbuddy.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Foodie Street, FL</p>
          </div>
        </div>
        <p className="footer-copy">&copy; 2025 Pocket Buddy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
