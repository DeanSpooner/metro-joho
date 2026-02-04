import React from "react";
import Grid from "./Grid";
import Box from "./Box";
import Header from "./Header";
import { Locale, Dictionary } from "@/i18n/config";

const Page = ({
  children,
  className,
  locale,
  dict,
}: {
  children?: React.ReactNode;
  className?: string;
  locale: Locale;
  dict: Dictionary;
}) => {
  return (
    <Grid className={className}>
      <Box>
        <Header locale={locale} dict={dict} />
      </Box>
      <Box>{children}</Box>
    </Grid>
  );
};

export default Page;
