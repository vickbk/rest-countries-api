export const updateSearchParams = ({
  param,
  value,
  pathname,
}: {
  param: string;
  value: string;
  pathname: string;
}) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (!value) {
    searchParams.delete(param);
  } else searchParams.set(param, value);
  return `${pathname}?${searchParams.toString()}`;
};
