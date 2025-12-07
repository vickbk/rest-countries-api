export const updateSearchParams = ({
  param,
  value,
  pathname,
  reset = [],
}: {
  param: string;
  value: string;
  pathname: string;
  reset?: string[];
}) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (!value) {
    searchParams.delete(param);
  } else searchParams.set(param, value);
  reset.forEach((param) => searchParams.delete(param));
  return `${pathname}?${searchParams.toString()}`;
};
