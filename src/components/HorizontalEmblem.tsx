"use client";

import React, { useEffect, useRef } from "react";

interface HorizontalEmblemTypes {
  color: string;
  text?: string;
  size?: "small" | "medium" | "large";
  animate?: boolean;
}

const HorizontalEmblem = ({
  color,
  text,
  size = "large",
  animate = true,
}: HorizontalEmblemTypes) => {
  const circleRef = useRef<SVGCircleElement | null>(null);
  const leftLineRef = useRef<HTMLDivElement | null>(null);
  const rightLineRef = useRef<HTMLDivElement | null>(null);

  const dimensions = {
    small: { height: 60, circleSize: 50, fontSize: "1rem", strokeWidth: 8, r: 20 },
    medium: { height: 112, circleSize: 80, fontSize: "1.5rem", strokeWidth: 12, r: 30 },
    large: { height: 150, circleSize: 120, fontSize: "2.5rem", strokeWidth: 20, r: 45 },
  }[size];

  useEffect(() => {
    if (!animate) {
      if (leftLineRef.current) leftLineRef.current.style.width = "100%";
      if (rightLineRef.current) {
        rightLineRef.current.style.width = "100%";
        rightLineRef.current.style.right = "-100";
      }
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = "0";
        circleRef.current.style.strokeOpacity = "1";
      }
      return;
    }

    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;
    const circle = circleRef.current;
    if (!leftLine || !rightLine || !circle) return;

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
  }, [animate]);

  return (
    <div
      style={{
        width: "calc(100% + 32px)",
        height: dimensions.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        right: 16,
      }}
    >
      <div
        style={{
          width: "50%",
          height: dimensions.height - 40,
          alignContent: "flex-end",
          zIndex: 1,
        }}
      >
        <div
          ref={leftLineRef}
          style={{
            height: dimensions.strokeWidth,
            width: 0,
            backgroundColor: color,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          height: dimensions.circleSize,
          width: dimensions.circleSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width={dimensions.circleSize}
          height={dimensions.circleSize}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <circle
            ref={circleRef}
            cx={dimensions.circleSize / 2}
            cy={dimensions.circleSize / 2}
            r={dimensions.r}
            stroke={color}
            strokeWidth={dimensions.strokeWidth}
            fill="white"
            style={{
              transform: "rotate(90deg)",
              transformOrigin: "50% 50%",
              strokeDashoffset: animate ? "1000" : "0",
              strokeOpacity: animate ? 0 : 1,
            }}
          />
        </svg>
        <p
          style={{
            zIndex: 1,
            color: "black",
            fontSize: dimensions.fontSize,
            fontWeight: 900,
          }}
        >
          {text}
        </p>
      </div>

      <div style={{ width: "50%", height: dimensions.height - 40, alignContent: "flex-end" }}>
        <div
          ref={rightLineRef}
          style={{
            height: dimensions.strokeWidth,
            width: 0,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default HorizontalEmblem;
