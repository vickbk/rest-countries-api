export const CommonContainer = ({
  children,
  className: moreclasses,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <section className={`${moreclasses}`}>{children}</section>;
};
