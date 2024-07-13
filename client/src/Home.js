// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for this component

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Our App</h1>
            <p>We are here to help you manage your tasks efficiently.</p>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut eros eros. Donec non velit in ipsum luctus maximus.</p>
            <div className="links">
                <Link to="/login" className="link-button">Login</Link>
                <Link to="/register" className="link-button">Signup</Link>
            </div>
        </div>
    );
}

export default Home;
