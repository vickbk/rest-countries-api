export const CommonContainer = ({
  children,
  className: moreclasses,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={`px-4 max-w-300 mx-auto xl:px-0 ${moreclasses}`}>
      {children}
    </section>
  );
};
