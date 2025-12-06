import { SROnly } from "../shared/SROnly";

export const Search = () => {
  return (
    <label className="relative grow">
      <i className="bi bi-search absolute top-1/2 -translate-y-1/2 left-6"></i>
      <SROnly>Entrer a country name</SROnly>
      <input
        className="outstand w-full p-4 rounded-lg pl-16"
        type="text"
        placeholder="search for a country..."
      />
    </label>
  );
};
