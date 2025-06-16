import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Clock, Shield } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, color, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            animateValue();
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animateValue = () => {
    const numericValue = parseInt(value.replace(/[^\d]/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setAnimatedValue(numericValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, duration / steps);
  };

  const formatValue = (num: number) => {
    if (value.includes('M')) return `${(num / 1000000).toFixed(1)}M+`;
    if (value.includes('K')) return `${(num / 1000).toFixed(0)}K+`;
    if (value.includes('%')) return `${num.toFixed(1)}%`;
    return num.toString();
  };

  return (
    <div
      ref={ref}
      className={`group relative bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
      }`}
    >
      <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
      
      <div className="relative z-10 text-center">
        <div className={`inline-flex p-3 rounded-xl ${color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        
        <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
          {isVisible ? formatValue(animatedValue) : '0'}
        </div>
        
        <div className="text-sm text-gray-600 font-medium">
          {label}
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 p-[1px]">
          <div className="w-full h-full bg-white rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

const InteractiveStats = () => {
  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      value: '10M+',
      label: 'Tasks Automated',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      delay: 100
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      value: '50K+',
      label: 'Active Users',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      delay: 200
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      value: '99.9%',
      label: 'Uptime',
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
      delay: 300
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      value: '24/7',
      label: 'Support',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      delay: 400
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by thousands of
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              forward-thinking companies
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              color={stat.color}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveStats;