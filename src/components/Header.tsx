import React from "react";
import TokyoMetroLogo from "../../public/TokyoMetroLogo.svg"; // Adjust the path as necessary
import Image from "next/image";
import Link from "next/link";
import Grid from "./Grid";
import Box from "./Box";
import Typography from "./Typography";

const Header = () => {
  return (
    <nav className="mb-4">
      <Grid className="px-[0px]">
        <Box colsXs={1} colsSm={1} colsMd={2} colsLg={4}>
          <Link href={"/"} style={{ width: 48, display: "block" }}>
            <Image alt="Tokyo Metro logo" src={TokyoMetroLogo} height={48} />
          </Link>
        </Box>
        <Box
          colsXs={1}
          colsSm={1}
          colsMd={2}
          colsLg={4}
          className="self-center justify-self-center"
        >
          <Link href="/lines" className="hover:underline">
            <Typography role="strong">View All Lines</Typography>
          </Link>
        </Box>
        <Box
          colsXs={1}
          colsSm={1}
          colsMd={2}
          colsLg={4}
          className="self-center justify-self-center"
        >
          <Link href="/stations" className="hover:underline">
            <Typography role="strong">View All Stations</Typography>
          </Link>
        </Box>
      </Grid>
    </nav>
  );
};

export default Header;
