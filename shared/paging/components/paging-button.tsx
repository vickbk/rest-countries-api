export const PagingButton = ({
  children,
  onClickFunction,
  isActive = false,
}: {
  children: React.ReactNode;
  onClickFunction: () => void;
  isActive?: boolean;
}) => {
  return (
    <li>
      <button
        className={`outstand active-button p-4 rounded-lg shadow-2xl cursor-pointer ${
          isActive ? "scale-85 opacity-40" : ""
        }`}
        type="button"
        onClick={onClickFunction}
        disabled={isActive}
      >
        {children}
      </button>
    </li>
  );
};
