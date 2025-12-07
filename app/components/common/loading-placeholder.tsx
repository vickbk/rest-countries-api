export const LoadingPlacehoder = ({
  className = "py-10",
}: {
  className?: string;
}) => {
  return <div className={`${className} animate-pulse`}></div>;
};
