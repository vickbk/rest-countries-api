import { forwardRef, useContext, type HTMLAttributes } from "react";
import { HeadingCtx } from "../../contexts/HeadingCtx";

export const Main = forwardRef<
  HTMLElement,
  { pageHasH1?: boolean } & HTMLAttributes<HTMLElement>
>(({ pageHasH1 = true, children, ...props }, ref) => {
  const level = useContext(HeadingCtx);
  return (
    <main {...props} ref={ref}>
      <HeadingCtx value={pageHasH1 ? level + 1 : level}>{children}</HeadingCtx>
    </main>
  );
});
