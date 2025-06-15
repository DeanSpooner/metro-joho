type ColumnSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
  colsXs?: ColumnSizes;
  colsSm?: ColumnSizes;
  colsMd?: ColumnSizes;
  colsLg?: ColumnSizes;
  role?: "div" | "span";
}

const spanClassesGenerator = (cols: ColumnSizes, size?: "sm" | "md" | "lg") => {
  return size ? `${size}:col-span-${cols}` : `col-span-${cols}`;
};

export default function Box({
  children,
  className = "",
  colsXs,
  colsSm,
  colsMd,
  colsLg,
  role = "div",
}: BoxProps) {
  const sm = colsSm ?? 3;
  const md = colsMd ?? colsSm ?? 6;
  const lg = colsLg ?? colsMd ?? colsSm ?? 12;

  const classes = [
    colsXs ? spanClassesGenerator(colsXs) : `col-span-3`,
    spanClassesGenerator(sm, "sm"),
    spanClassesGenerator(md, "md"),
    spanClassesGenerator(lg, "lg"),
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
