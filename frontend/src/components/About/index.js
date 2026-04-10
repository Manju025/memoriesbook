import React from 'react';
import './About.css';
import { FaGraduationCap, FaHeart, FaCode, FaLaptopCode } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About <span className="highlight">Memories Book</span></h1>
        <p className="about-subtitle">Capture, share, and cherish life's beautiful moments.</p>
      </div>

      <div className="about-content">
        <div className="about-section glass-panel">
          <div className="section-icon"><FaHeart /></div>
          <h2>Our Mission</h2>
          <p>
            Welcome to Memories Book, a dedicated space for sharing memories, thoughts, and experiences with the world. 
            We believe that every moment is a story waiting to be told. 
          </p>
          <p>
            Whether it’s an unforgettable <strong>trip, event, or wedding</strong>, a weekend spent <strong>hiking, fishing, or cooking</strong>, 
            or even simple joys like <strong>singing, spending time together, exploring temples</strong>, uncovering new <strong>technologies</strong>, 
            or sharing life <strong>tips</strong>—this platform is yours. Share everything that makes your journey unique.
          </p>
          <div className="tag-cloud">
            <span>Trip</span><span>Wedding</span><span>Hiking</span><span>Cooking</span><span>Memories</span>
            <span>Technology</span><span>Friends</span><span>Tips</span><span>Events</span>
          </div>
        </div>

        <div className="about-section glass-panel developer-section">
          <div className="section-icon"><FaLaptopCode /></div>
          <h2>About the Developer</h2>
          <p>
            Hi! I'm <strong>Manjundhar</strong>, the creator of this platform. I built Memories Book out of my passion for software engineering 
            and creating digital spaces that connect people through beautiful experiences.
          </p>
          
          <div className="whisper-box">
            <FaCode className="whisper-icon" />
            <p>
              <em>*Whispers*</em> Like what you see? I am actively seeking an <strong className="gradient-text">IT Fresher Role</strong> to kickstart my career in the tech industry! 
              If you have any opportunities or wish to support my journey, I would love to connect. Let's build something amazing together!
            </p>
            <FaGraduationCap className="whisper-icon-end" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
