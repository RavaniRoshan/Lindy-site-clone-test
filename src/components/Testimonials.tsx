import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Play } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  videoUrl?: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "VP of Operations",
      company: "TechFlow Inc",
      content: "Lindy has revolutionized how we handle customer support. Our response time improved by 80% and customer satisfaction scores are at an all-time high. The AI understands context better than any solution we've tried.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      videoUrl: "#"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "CTO",
      company: "DataDrive Solutions",
      content: "The AI automation capabilities are incredible. We've reduced manual work by 60% while maintaining the same quality standards. It's been a game-changer for our development team's productivity.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Head of Customer Success",
      company: "GrowthLab",
      content: "Implementation was seamless and the results were immediate. Our team can now focus on strategic initiatives while Lindy handles routine tasks perfectly. The ROI was evident within the first month.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      videoUrl: "#"
    },
    {
      id: 4,
      name: "David Park",
      role: "Founder & CEO",
      company: "InnovateCorp",
      content: "Lindy's AI assistant feels like having a dedicated team member who never sleeps. The accuracy and efficiency are outstanding, and it scales perfectly with our growth. Absolutely transformative.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying || isVideoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isVideoPlaying, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by industry leaders
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how companies like yours are transforming their operations with AI-powered automation.
          </p>
        </div>

        {/* Enhanced Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-500">
            <div className="p-8 lg:p-12 relative">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
              
              {/* Quote Icon with animation */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="text-center mb-8">
                <blockquote className="text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6 relative">
                  <span className="relative z-10">"{testimonials[currentIndex].content}"</span>
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 animate-expand-width"></div>
                </blockquote>

                {/* Enhanced Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 fill-current hover:scale-125 transition-transform duration-200 cursor-pointer" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Enhanced Author Info */}
                <div className="flex items-center justify-center space-x-4 group">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                  </div>
                  {testimonials[currentIndex].videoUrl && (
                    <button 
                      className="ml-4 p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors duration-300 group"
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    >
                      <Play className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full p-3 hover:bg-white hover:shadow-lg transition-all duration-300 group hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-purple-600 group-hover:-translate-x-0.5 transition-all duration-300" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full p-3 hover:bg-white hover:shadow-lg transition-all duration-300 group hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all duration-300" />
          </button>
        </div>

        {/* Enhanced Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 hover:scale-125 ${
                index === currentIndex
                  ? 'w-8 h-3 bg-purple-600 rounded-full'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
              }`}
            >
              {index === currentIndex && (
                <div className="absolute inset-0 bg-purple-600 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Progress bar for auto-play */}
        {isAutoPlaying && !isVideoPlaying && (
          <div className="flex justify-center mt-4">
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-progress"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;