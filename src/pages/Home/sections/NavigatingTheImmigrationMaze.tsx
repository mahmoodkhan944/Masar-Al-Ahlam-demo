"use client";

import { useEffect, useRef, useState } from "react";

export default function NavigatingTheImmigrationMaze() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollProgressRef = useRef(0);

  const [canvasReady, setCanvasReady] = useState(false);

  
  const mazePath = [
    { x: 0.1, y: 0.5 },
    { x: 0.15, y: 0.5 },
    { x: 0.15, y: 0.3 },
    { x: 0.25, y: 0.3 },
    { x: 0.25, y: 0.6 },
    { x: 0.35, y: 0.6 },
    { x: 0.35, y: 0.2 },
    { x: 0.45, y: 0.2 },
    { x: 0.45, y: 0.7 },
    { x: 0.55, y: 0.7 },
    { x: 0.55, y: 0.35 },
    { x: 0.65, y: 0.35 },
    { x: 0.65, y: 0.65 },
    { x: 0.75, y: 0.65 },
    { x: 0.75, y: 0.4 },
    { x: 0.85, y: 0.4 },
    { x: 0.85, y: 0.5 },
    { x: 0.9, y: 0.5 }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      if (canvas.width > 0 && canvas.height > 0) {
        setCanvasReady(true);
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    if (!canvasReady) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = rect.height;

      const scrollStart = rect.top + containerHeight * 0.2;
      const scrollEnd = rect.top - windowHeight + containerHeight * 0.8;

      let progress = 0;
      if (scrollStart > windowHeight) {
        progress = 0;
      } else if (scrollEnd < 0) {
        progress = 1;
      } else {
        const totalScrollDistance = windowHeight - containerHeight * 0.2 + containerHeight * 0.8;
        const currentScrollDistance = windowHeight - scrollStart;
        progress = Math.max(0, Math.min(1, currentScrollDistance / totalScrollDistance));
      }

      scrollProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [canvasReady]);

  useEffect(() => {
    if (!canvasReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const progress = scrollProgressRef.current;
      const totalSegments = mazePath.length - 1;
      const drawSegments = progress * totalSegments;

      ctx.strokeStyle = "hsl(215, 80%, 45%)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      for (let i = 0; i < Math.floor(drawSegments); i++) {
        const p1 = mazePath[i];
        const p2 = mazePath[i + 1];
        if (!p1 || !p2) continue;

        if (i === 0) {
          ctx.moveTo(p1.x * w, p1.y * h);
        }
        ctx.lineTo(p2.x * w, p2.y * h);
      }

      if (drawSegments > 0 && drawSegments < totalSegments) {
        const segmentIndex = Math.floor(drawSegments);
        const segmentProgress = drawSegments - segmentIndex;
        const p1 = mazePath[segmentIndex];
        const p2 = mazePath[segmentIndex + 1];

        if (p1 && p2) {
          const partialX = p1.x + (p2.x - p1.x) * segmentProgress;
          const partialY = p1.y + (p2.y - p1.y) * segmentProgress;
          ctx.lineTo(partialX * w, partialY * h);
        }
      }

      ctx.stroke();

      if (progress >= 1) {
        const endPoint = mazePath[mazePath.length - 1];
        if (endPoint) {
          const glowIntensity = 0.5 + 0.5 * Math.sin(Date.now() / 300);

          ctx.shadowBlur = 20;
          ctx.shadowColor = "hsl(40, 95%, 50%)";
          ctx.fillStyle = `hsl(40, 95%, 50%, ${glowIntensity})`;
          ctx.beginPath();
          ctx.arc(endPoint.x * w, endPoint.y * h, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasReady]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-dark-background overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground-dark mb-4">
          Navigating the Immigration Maze
        </h2>
        <p className="text-lg md:text-xl text-foreground-dark/80 max-w-2xl mx-auto">
          Let RapidLine Immigration guide you through complex immigration processes with clarity and confidence.
        </p>
      </div>
    </section>
  );
}