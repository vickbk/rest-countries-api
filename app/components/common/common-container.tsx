export const CommonContainer = ({
  children,
  className: moreclasses,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <section className={`px-4 ${moreclasses}`}>{children}</section>;
};
