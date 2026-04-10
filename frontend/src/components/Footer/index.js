import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-links" style={{ display: 'flex', gap: '20px', marginBottom: '15px', justifyContent: 'center' }}>
            <Link to="/" className="footer-link" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>Home</Link>
            <Link to="/about" className="footer-link" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>About</Link>
        </div>
        <div className="footer-social">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaLinkedin className="social-icon" /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaGithub className="social-icon" /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram  className="social-icon" /></a>
        </div>
        <p className="footer-contact">Contact us: <a href="mailto:manjundhar1701@mail.com" className='contact-mail'>manjundhar1701@gmail.com</a></p>
        <p className='footer-greet'>Made with <span className = "love">🩵</span> to cherish forever</p>
        <p className="footer-text">© 2026 Memories Book. All rights reserved.</p>
    </div>
  );
}

export default Footer;