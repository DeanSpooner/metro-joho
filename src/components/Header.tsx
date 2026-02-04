"use client";

import React, { useState } from "react";
import TokyoMetroLogo from "../../public/TokyoMetroLogo.svg";
import Image from "next/image";
import Link from "next/link";
import Grid from "./Grid";
import Box from "./Box";
import Typography from "./Typography";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, Dictionary } from "@/i18n/config";

const Header = ({ locale, dict }: { locale: Locale; dict: Dictionary }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
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
            className="hidden lg:flex self-center justify-self-center lg:justify-self-start"
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
            colsXs={2}
            colsSm={2}
            colsMd={5}
            colsLg={7}
            className="self-center justify-self-end"
          >
            <div className="hidden lg:flex">
              <LanguageSwitcher currentLocale={locale} />
            </div>

            <div className="flex lg:hidden justify-end">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </Box>
        </Grid>
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#02022a]/95 backdrop-blur-md border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end p-2 text-white hover:bg-white/10 rounded-md transition-colors mb-8"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <nav className="flex flex-col space-y-6">
            <Link
              href={`/${locale}/lines`}
              className="text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              <Typography role="strong">{dict.header.viewLines}</Typography>
            </Link>
            <Link
              href={`/${locale}/stations`}
              className="text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              <Typography role="strong">{dict.header.viewStations}</Typography>
            </Link>
          </nav>

          <div className="pt-6">
            <Typography className="text-white/60 text-sm mb-3">Language</Typography>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
