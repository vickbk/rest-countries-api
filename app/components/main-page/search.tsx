import { SROnly } from "../shared/SROnly";

export const Search = () => {
  return (
    <label>
      <i className="bi bi-search"></i>
      <SROnly>Entrer a country name</SROnly>
      <input type="text" placeholder="search for a country..." />
    </label>
  );
};
