import React from "react";

const Grid = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`mx-auto max-w-[1200px] grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-1 px-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default Grid;
