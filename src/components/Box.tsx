type ColumnSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
  colsSm?: ColumnSizes;
  colsMd?: ColumnSizes;
  colsLg?: ColumnSizes;
  role?: "div" | "span";
}

const colSpanClassesSm: Record<number, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  6: "sm:col-span-6",
  7: "sm:col-span-7",
  8: "sm:col-span-8",
  9: "sm:col-span-9",
  10: "sm:col-span-10",
  11: "sm:col-span-11",
  12: "sm:col-span-12",
};

const colSpanClassesMd: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

const colSpanClassesLg: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};

export default function Box({
  children,
  className = "",
  colsSm,
  colsMd,
  colsLg,
  role = "div",
}: BoxProps) {
  const sm = colsSm ?? 3;
  const md = colsMd ?? colsSm ?? 6;
  const lg = colsLg ?? colsMd ?? colsSm ?? 12;

  const classes = [
    `col-span-3`,
    colSpanClassesSm[sm],
    colSpanClassesMd[md],
    colSpanClassesLg[lg],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return role === "span" ? (
    <span className={classes}>{children}</span>
  ) : (
    <div className={classes}>{children}</div>
  );
}
