import React from 'react';
import './../App.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-intro">
        <p className="about-welcome">
          Welcome to <strong>Bhojan-App</strong>, a cutting-edge React-based frontend project that brings the convenience and innovation of Swiggy's live API to the world of online food ordering. <strong>Bhojan</strong>, the Sanskrit word for "meal", reflects our commitment to delivering a seamless and delightful dining experience to our users.
        </p>
      </section>

      <section className="about-section">
        <h1>Our Mission</h1>
        <p>
          At <strong>Bhojan-App</strong>, our mission is to revolutionize the way you experience food delivery. We leverage Swiggy's live API to provide real-time access to a diverse range of restaurants, ensuring that you can discover, order, and enjoy your favorite meals with just a few clicks.
        </p>
      </section>

      <section className="about-section">
        <h1>Key Features</h1>
        <ul>
          <li>
            <strong>Real-time Menu Updates:</strong> Our integration with Swiggy's live API ensures that you always have the latest and most accurate menu information at your fingertips.
          </li>
          <li>
            <strong>Intuitive User Interface:</strong> We have crafted a user-friendly interface that simplifies the ordering process, making it easy for you to explore different cuisines and dishes effortlessly.
          </li>
          <li>
            <strong>Personalized Recommendations:</strong> Enjoy a curated dining experience with personalized recommendations based on your preferences and ordering history.
          </li>
        </ul>
      </section>

      <section className="about-section">
        <h1>Join Us on This Culinary Journey</h1>
        <p>
          Embark on a delightful journey with <strong>Bhojan-App</strong>, where we combine the power of React technology with Swiggy's live API to redefine your food ordering experience. Whether you're a food enthusiast, a busy professional, or someone looking for a convenient way to savor fantastic meals, Bhojan-App is here to make your dining dreams a reality.
        </p>
        <p>Thank you for choosing Bhojan-App – where good food meets great technology!</p>
      </section>
    </div>
  );
};

export default About;
