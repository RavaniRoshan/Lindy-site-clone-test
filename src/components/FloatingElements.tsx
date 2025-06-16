import React, { useEffect, useRef } from 'react';
import { Brain, Zap, Shield, Sparkles, Star, Circle } from 'lucide-react';

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const elements = containerRef.current.querySelectorAll('.floating-element');
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      elements.forEach((element, index) => {
        const htmlElement = element as HTMLElement;
        const speed = (index + 1) * 0.02;
        const x = (clientX - centerX) * speed;
        const y = (clientY - centerY) * speed;

        htmlElement.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingIcons = [
    { Icon: Brain, color: 'text-purple-400', size: 'w-6 h-6', delay: '0s' },
    { Icon: Zap, color: 'text-blue-400', size: 'w-5 h-5', delay: '1s' },
    { Icon: Shield, color: 'text-teal-400', size: 'w-7 h-7', delay: '2s' },
    { Icon: Sparkles, color: 'text-purple-300', size: 'w-4 h-4', delay: '3s' },
    { Icon: Star, color: 'text-blue-300', size: 'w-5 h-5', delay: '4s' },
    { Icon: Circle, color: 'text-teal-300', size: 'w-3 h-3', delay: '5s' },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`floating-element absolute opacity-20 transition-transform duration-1000 ease-out animate-float`}
          style={{
            left: `${10 + (index * 15)}%`,
            top: `${20 + (index * 10)}%`,
            animationDelay: item.delay,
            animationDuration: `${6 + index}s`,
          }}
        >
          <item.Icon className={`${item.size} ${item.color}`} />
        </div>
      ))}

      {/* Geometric shapes */}
      {[...Array(8)].map((_, index) => (
        <div
          key={`shape-${index}`}
          className="floating-element absolute opacity-10 transition-transform duration-1000 ease-out"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${index * 0.5}s`,
          }}
        >
          <div
            className={`w-${2 + (index % 3)} h-${2 + (index % 3)} ${
              index % 2 === 0 ? 'bg-purple-300' : 'bg-blue-300'
            } ${index % 3 === 0 ? 'rounded-full' : 'rounded-lg'} animate-pulse`}
            style={{
              animationDuration: `${3 + index}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;