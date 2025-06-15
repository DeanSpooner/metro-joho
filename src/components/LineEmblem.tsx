"use client";

import React, { useEffect, useRef } from "react";

const LineEmblem = () => {
  const circleRef = useRef<SVGCircleElement | null>(null); // explicitly type the ref

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return; // <- prevents null access

    const length = circle.getTotalLength();
    circle.style.strokeDasharray = `${length}`;
    circle.style.strokeDashoffset = `${-length}`;
    circle.style.transition = "none";

    requestAnimationFrame(() => {
      circle.style.transition = "stroke-dashoffset 2s ease";
      circle.style.strokeDashoffset = "0";
    });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: 120,
        width: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="120"
        height="120"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <circle
          ref={circleRef}
          cx="60"
          cy="60"
          r="45"
          stroke="red"
          strokeWidth="20"
          fill="white"
          style={{
            transform: "rotate(90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <h1 style={{ zIndex: 1, color: "black" }}>M</h1>
    </div>
  );
};

export default LineEmblem;
