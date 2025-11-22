import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import InteractiveStats from './components/InteractiveStats';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import MouseFollower from './components/MouseFollower';
import FloatingElements from './components/FloatingElements';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Global Effects */}
      <ScrollProgress />
      <MouseFollower />
      <FloatingElements />
      <AnimatedBackground />
      
      {/* Main Content */}
      <Navigation />
      <Hero />
      <InteractiveStats />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;