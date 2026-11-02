import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const AppleMeshGlow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Apple-inspired smooth floating glowing orbs
    const orbs = [
      {
        x: width * 0.3,
        y: height * 0.35,
        radius: Math.min(width, height) * 0.35,
        vx: 0.15,
        vy: 0.2,
      },
      {
        x: width * 0.7,
        y: height * 0.45,
        radius: Math.min(width, height) * 0.4,
        vx: -0.2,
        vy: 0.15,
      },
      {
        x: width * 0.5,
        y: height * 0.6,
        radius: Math.min(width, height) * 0.3,
        vx: 0.1,
        vy: -0.15,
      },
    ];

    let t = 0;

    const render = () => {
      t += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Render soft gradients
      orbs.forEach((orb, i) => {
        orb.x += orb.vx + Math.sin(t + i) * 0.3;
        orb.y += orb.vy + Math.cos(t + i) * 0.3;

        // Bounce gently near borders
        if (orb.x < width * 0.1 || orb.x > width * 0.9) orb.vx *= -1;
        if (orb.y < height * 0.1 || orb.y > height * 0.9) orb.vy *= -1;

        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );

        if (theme === 'dark') {
          // Subtle blue and violet Apple luminous glow in dark mode
          if (i === 0) {
            grad.addColorStop(0, 'rgba(41, 151, 255, 0.15)');
            grad.addColorStop(1, 'rgba(41, 151, 255, 0)');
          } else if (i === 1) {
            grad.addColorStop(0, 'rgba(94, 92, 230, 0.12)');
            grad.addColorStop(1, 'rgba(94, 92, 230, 0)');
          } else {
            grad.addColorStop(0, 'rgba(48, 209, 88, 0.08)');
            grad.addColorStop(1, 'rgba(48, 209, 88, 0)');
          }
        } else {
          // Soft Apple blue luminous glow in light mode
          if (i === 0) {
            grad.addColorStop(0, 'rgba(0, 113, 227, 0.09)');
            grad.addColorStop(1, 'rgba(0, 113, 227, 0)');
          } else if (i === 1) {
            grad.addColorStop(0, 'rgba(88, 86, 214, 0.06)');
            grad.addColorStop(1, 'rgba(88, 86, 214, 0)');
          } else {
            grad.addColorStop(0, 'rgba(52, 199, 89, 0.05)');
            grad.addColorStop(1, 'rgba(52, 199, 89, 0)');
          }
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80 transition-opacity duration-1000"
      style={{ filter: 'blur(60px)' }}
    />
  );
};

