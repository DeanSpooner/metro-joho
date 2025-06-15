import React from "react";

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
}

const Typography = ({ children, className, role = "p" }: TypographyProps) => {
  switch (role) {
    case "h1":
      return <h1 className={className}>{children}</h1>;
    case "h2":
      return <h2 className={className}>{children}</h2>;
    case "h3":
      return <h3 className={className}>{children}</h3>;
    case "h4":
      return <h4 className={className}>{children}</h4>;
    case "h5":
      return <h5 className={className}>{children}</h5>;
    case "h6":
      return <h6 className={className}>{children}</h6>;
    case "p":
      return <p className={className}>{children}</p>;
    case "strong":
      return <strong className={className}>{children}</strong>;
  }
};

export default Typography;
