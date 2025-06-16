import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createGradient = (x: number, y: number, radius: number, color1: string, color2: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      return gradient;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.01;

      // Animated gradient orbs
      const orbs = [
        {
          x: canvas.width * 0.2 + Math.sin(time) * 100,
          y: canvas.height * 0.3 + Math.cos(time * 0.8) * 80,
          radius: 200 + Math.sin(time * 2) * 50,
          color1: 'rgba(139, 92, 246, 0.1)',
          color2: 'rgba(139, 92, 246, 0)'
        },
        {
          x: canvas.width * 0.8 + Math.cos(time * 1.2) * 120,
          y: canvas.height * 0.6 + Math.sin(time * 0.6) * 100,
          radius: 250 + Math.cos(time * 1.5) * 60,
          color1: 'rgba(59, 130, 246, 0.1)',
          color2: 'rgba(59, 130, 246, 0)'
        },
        {
          x: canvas.width * 0.5 + Math.sin(time * 0.7) * 150,
          y: canvas.height * 0.8 + Math.cos(time * 1.1) * 90,
          radius: 180 + Math.sin(time * 2.2) * 40,
          color1: 'rgba(20, 184, 166, 0.1)',
          color2: 'rgba(20, 184, 166, 0)'
        }
      ];

      orbs.forEach(orb => {
        const gradient = createGradient(orb.x, orb.y, orb.radius, orb.color1, orb.color2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Floating geometric shapes
      for (let i = 0; i < 20; i++) {
        const x = (canvas.width / 20) * i + Math.sin(time + i) * 30;
        const y = canvas.height * 0.5 + Math.cos(time * 0.5 + i) * 100;
        const size = 2 + Math.sin(time * 2 + i) * 1;
        
        ctx.fillStyle = `rgba(139, 92, 246, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.fillRect(x, y, size, size);
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default AnimatedBackground;