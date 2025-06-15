"use client";

import React, { useEffect, useRef } from "react";

interface HorizontalEmblemTypes {
  color: string;
  text?: string;
}

const HorizontalEmblem = ({ color, text }: HorizontalEmblemTypes) => {
  const circleRef = useRef<SVGCircleElement | null>(null);
  const leftLineRef = useRef<HTMLDivElement | null>(null);
  const rightLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;
    const circle = circleRef.current;
    if (!leftLine || !rightLine || !circle) return;

    // Animate left line
    leftLine.style.transition = "width 1s ease-in";
    leftLine.style.width = "100%";

    setTimeout(() => {
      const length = circle.getTotalLength();

      circle.style.strokeDasharray = `${length}`;
      circle.style.strokeDashoffset = `${-length}`;
      circle.style.transition = "none";
      circle.style.strokeOpacity = "0";

      requestAnimationFrame(() => {
        circle.style.transition =
          "stroke-dashoffset 0.5s linear, stroke-opacity 0.1s ease";
        circle.style.strokeDashoffset = "0";
        circle.style.strokeOpacity = "1";
      });

      setTimeout(() => {
        rightLine.style.transition = "width 1s ease-out";
        rightLine.style.width = "100%";
        rightLine.style.right = "-100";
      }, 500);
    }, 1000);
  }, []);

  return (
    <div
      style={{
        width: "calc(100% + 32px)",
        height: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        right: 16,
      }}
    >
      {/* Left line */}
      <div
        style={{
          width: "50%",
          height: 110,
          alignContent: "flex-end",
          zIndex: 1,
        }}
      >
        <div
          ref={leftLineRef}
          style={{
            height: 20,
            width: 0,
            backgroundColor: color,
          }}
        />
      </div>
      {/* Circle */}
      <div
        style={{
          position: "absolute",
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
            stroke={color}
            strokeWidth="20"
            fill="white"
            style={{
              transform: "rotate(90deg)",
              transformOrigin: "50% 50%",
              strokeDashoffset: "1000",
              strokeOpacity: 0,
            }}
          />
        </svg>
        <p
          style={{
            zIndex: 1,
            color: "black",
            fontSize: "2.5rem",
            fontWeight: 900,
          }}
        >
          {text}
        </p>
      </div>
      {/* Right line */}
      <div style={{ width: "50%", height: 110, alignContent: "flex-end" }}>
        <div
          ref={rightLineRef}
          style={{
            height: 20,
            width: 0,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default HorizontalEmblem;
