import React from "react";
import TokyoMetroLogo from "../../public/TokyoMetroLogo.svg";
import Image from "next/image";
import Link from "next/link";
import Grid from "./Grid";
import Box from "./Box";
import Typography from "./Typography";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, Dictionary } from "@/i18n/config";

const Header = ({ locale, dict }: { locale: Locale; dict: Dictionary }) => {
  return (
    <nav className="mb-4">
      <Grid className="px-[0px] items-center">
        <Box colsXs={1} colsSm={1} colsMd={1} colsLg={1}>
          <Link href={`/${locale}`} style={{ width: 48, display: "block" }}>
            <Image alt={dict.header.logoAlt} src={TokyoMetroLogo} height={48} />
          </Link>
        </Box>
        <Box
          colsXs={1}
          colsSm={1}
          colsMd={1}
          colsLg={4}
          className="self-center justify-self-center lg:justify-self-start"
        >
          <div className="flex space-x-8">
            <Link href={`/${locale}/lines`} className="hover:underline">
              <Typography role="strong">{dict.header.viewLines}</Typography>
            </Link>
            <Link href={`/${locale}/stations`} className="hover:underline">
              <Typography role="strong">{dict.header.viewStations}</Typography>
            </Link>
          </div>
        </Box>
        <Box
          colsXs={1}
          colsSm={1}
          colsMd={1}
          colsLg={7}
          className="self-center justify-self-end"
        >
          <LanguageSwitcher currentLocale={locale} />
        </Box>
      </Grid>
    </nav>
  );
};

export default Header;
