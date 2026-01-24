import React from "react";
import Typography from "./Typography";

const Hero = ({ isBackwards }: { isBackwards?: boolean }) => {
  return (
    <div className="bg-yellow-500 w-full overflow-hidden border-y-2 border-black">
      <div
        className={`flex animate-[marquee-half_30s_linear_infinite] w-fit ${isBackwards ? "animate-[marquee-half_30s_linear_infinite_reverse]" : ""}`}
      >
        <Typography
          role="h1"
          className="py-2 text-black !font-light !text-4xl md:!text-6xl lg:!text-7xl whitespace-nowrap px-0"
          font="zenKaku"
        >
          TOKYOMETRO東京メトロTOKYOMETRO東京メトロTOKYOMETRO東京メトロTOKYOMETRO東京メトロ
        </Typography>
        <Typography
          role="h1"
          className="py-2 text-black !font-light !text-4xl md:!text-6xl lg:!text-7xl whitespace-nowrap px-0"
          font="zenKaku"
        >
          TOKYOMETRO東京メトロTOKYOMETRO東京メトロTOKYOMETRO東京メトロTOKYOMETRO東京メトロ
        </Typography>
      </div>
    </div>
  );
};

export default Hero;
