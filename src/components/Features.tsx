import React, { useEffect, useRef, useState } from 'react';
import { 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  BarChart3, 
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: number;
  features: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, gradient, delay, features }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 p-[1px] animate-gradient-x">
            <div className="w-full h-full bg-white/70 backdrop-blur-sm rounded-2xl" />
          </div>
        </div>
        
        <div className="relative z-10">
          <div className={`inline-flex p-3 rounded-xl ${gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Feature list with staggered animation */}
          <div className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-2 text-sm text-gray-600 transform transition-all duration-300 ${
                  isHovered ? 'translate-x-2 opacity-100' : 'translate-x-0 opacity-70'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform duration-300 cursor-pointer">
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: `${2 + i * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      title: "Advanced AI Engine",
      description: "Powered by state-of-the-art machine learning algorithms that adapt and learn from your unique business needs.",
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
      delay: 100,
      features: ["Neural network processing", "Continuous learning", "Custom model training"]
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Lightning Fast Processing",
      description: "Process thousands of requests per second with sub-millisecond response times for real-time applications.",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      delay: 200,
      features: ["Sub-millisecond latency", "Auto-scaling", "Global edge network"]
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with SOC2, GDPR, and HIPAA standards to protect your data.",
      gradient: "bg-gradient-to-r from-teal-500 to-teal-600",
      delay: 300,
      features: ["End-to-end encryption", "SOC2 compliance", "Zero-trust architecture"]
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Team Collaboration",
      description: "Built-in collaboration tools that allow your team to work together seamlessly on AI projects.",
      gradient: "bg-gradient-to-r from-orange-500 to-orange-600",
      delay: 400,
      features: ["Real-time collaboration", "Role-based access", "Version control"]
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: "Advanced Analytics",
      description: "Comprehensive analytics and insights to track performance and optimize your AI assistant's effectiveness.",
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
      delay: 500,
      features: ["Real-time metrics", "Custom dashboards", "Predictive insights"]
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "24/7 Availability",
      description: "Your AI assistant works around the clock, providing consistent support and automation without breaks.",
      gradient: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      delay: 600,
      features: ["99.9% uptime", "Global availability", "Instant failover"]
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 rounded-full px-4 py-2 mb-6 hover:bg-purple-200 transition-colors duration-300 cursor-pointer group">
            <Sparkles className="w-4 h-4 text-purple-600 group-hover:animate-spin" />
            <span className="text-sm font-medium text-purple-600">Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to build
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              intelligent automation
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and features you need to create, 
            deploy, and scale AI assistants that transform your business operations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={feature.delay}
              features={feature.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;