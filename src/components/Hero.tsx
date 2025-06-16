import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import ParticleSystem from './ParticleSystem';
import TypingAnimation from './TypingAnimation';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Interactive gradient that follows mouse */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full filter blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Particle System */}
      <ParticleSystem />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Badge with pulse effect */}
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-purple-200/50 rounded-full px-4 py-2 mb-8 group hover:bg-white/80 transition-all duration-300">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-300">AI Assistant Now Available</span>
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
          </div>

          {/* Main Heading with text reveal animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Build Your Perfect
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              AI Assistant
            </span>
          </h1>

          {/* Typing Animation */}
          <div className="text-xl md:text-2xl text-gray-600 mb-8 h-16 flex items-center justify-center">
            <TypingAnimation 
              phrases={[
                "Automate your workflows with intelligence",
                "Handle customer support 24/7",
                "Process data at superhuman speed",
                "Scale your business operations"
              ]}
            />
          </div>

          {/* CTA Buttons with enhanced hover effects */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <button className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button className="group flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-300">
              <div className="relative w-12 h-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full flex items-center justify-center group-hover:bg-purple-50 transition-all duration-300 group-hover:scale-110">
                <Play className="w-5 h-5 ml-0.5 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </div>
              <span className="font-medium">Watch Demo</span>
            </button>
          </div>

          {/* Enhanced Stats with counter animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { value: '10M+', label: 'Tasks Automated' },
              { value: '50K+', label: 'Active Users' },
              { value: '99.9%', label: 'Uptime' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300 group-hover:scale-110 transform transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Floating UI Elements */}
      <div className="absolute top-1/4 left-10 transform -translate-y-1/2 hidden lg:block">
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 shadow-xl animate-float hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Task Completed</div>
              <div className="text-xs text-gray-500">2 seconds ago</div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="absolute top-3/4 right-10 transform -translate-y-1/2 hidden lg:block">
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 shadow-xl animate-float animation-delay-2000 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-300">System Active</div>
          </div>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute bottom-1/4 left-1/4 hidden xl:block">
        <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur-sm border border-teal-200/30 rounded-xl p-3 animate-float animation-delay-4000 hover:scale-110 transition-transform duration-300">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-400 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;