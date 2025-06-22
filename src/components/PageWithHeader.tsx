import React from "react";
import Grid from "./Grid";
import Box from "./Box";
import Header from "./Header";

const Page = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Grid>
      <Box>
        <Header />
      </Box>
      <Box>{children}</Box>
    </Grid>
  );
};

export default Page;
