import { forwardRef, useContext, type HTMLAttributes } from "react";
import { HeadingCtx } from "../../contexts/HeadingCtx";

export const Heading = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, ...props }, ref) => {
  const level = useContext(HeadingCtx);
  const headings = [
    <h1 {...props} ref={ref}>
      {children}
    </h1>,
    <h2 {...props} ref={ref}>
      {children}
    </h2>,
    <h3 {...props} ref={ref}>
      {children}
    </h3>,
    <h4 {...props} ref={ref}>
      {children}
    </h4>,
    <h5 {...props} ref={ref}>
      {children}
    </h5>,
    <h6 {...props} ref={ref}>
      {children}
    </h6>,
  ];
  return <>{headings[level]}</>;
});
