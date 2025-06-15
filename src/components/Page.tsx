import React from "react";
import Grid from "./Grid";
import Box from "./Box";

const Page = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Grid>
      <Box>{children}</Box>
    </Grid>
  );
};

export default Page;
