import React from "react";
import { twMerge } from "tailwind-merge";
import localFont from "next/font/local";

const zenKakuGothicNewJP = localFont({
  src: [
    {
      path: "../../public/fonts/Zen_Kaku_Gothic_New/ZenKakuGothicNew-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Zen_Kaku_Gothic_New/ZenKakuGothicNew-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Zen_Kaku_Gothic_New/ZenKakuGothicNew-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Zen_Kaku_Gothic_New/ZenKakuGothicNew-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Zen_Kaku_Gothic_New/ZenKakuGothicNew-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-zen-kaku-gothic-new-jp",
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
  style?: React.CSSProperties;
}

const Typography = ({
  children,
  className,
  role = "p",
  font = "noto",
  style,
}: TypographyProps) => {
  const Component = role as React.ElementType;

  return (
    <Component
      className={twMerge(
        font === "zenKaku" ? zenKakuGothicNewJP.className : "",
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
};

export default Typography;
