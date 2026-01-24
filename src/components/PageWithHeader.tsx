import React from "react";
import Grid from "./Grid";
import Box from "./Box";
import Header from "./Header";

const Page = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Grid className={className}>
      <Box>
        <Header />
      </Box>
      <Box>{children}</Box>
    </Grid>
  );
};

export default Page;
