import React from "react";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { twMerge } from "tailwind-merge";

const zenKakuGothicNewJP = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-zen-kaku-gothic-new-jp",
  display: "swap",
});

export type TypographyRole =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "strong";

interface TypographyProps {
  children?: React.ReactNode;
  className?: string;
  role?: TypographyRole;
  font?: "noto" | "zenKaku";
}

const Typography = ({
  children,
  className,
  role = "p",
  font = "noto",
}: TypographyProps) => {
  switch (role) {
    case "h1":
      return (
        <h1
          className={twMerge(
            font === "zenKaku" ? zenKakuGothicNewJP.className : "",
            className
          )}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`${
            font === "zenKaku" ? zenKakuGothicNewJP.className : ""
          } ${className}`}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`${
            font === "zenKaku" ? zenKakuGothicNewJP.className : ""
          } ${className}`}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={`${
            font === "zenKaku" ? zenKakuGothicNewJP.className : ""
          } ${className}`}
        >
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5
          className={`${
            font === "zenKaku" ? zenKakuGothicNewJP.className : ""
          } ${className}`}
        >
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6
          className={`${
            font === "zenKaku" ? zenKakuGothicNewJP.className : ""
          } ${className}`}
        >
          {children}
        </h6>
      );
    case "p":
      return (
        <p
          className={`${
            font === "zenKaku" ? zenKakuGothicNewJP.className : ""
          } ${className}`}
        >
          {children}
        </p>
      );
    case "strong":
      return (
        <strong
          className={`${
            font === "zenKaku" ? zenKakuGothicNewJP.className : ""
          } ${className}`}
        >
          {children}
        </strong>
      );
  }
};

export default Typography;
