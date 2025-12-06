import { SROnly } from "../shared/SROnly";

export const Filter = () => {
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
  return (
    <details>
      <summary>Filter by Region</summary>
      <form>
        {regions.map((region, key) => (
          <label key={key}>
            {region} <SROnly>region</SROnly>
            <input
              type="radio"
              name="region"
              className="sr-only"
              value={region}
            />
          </label>
        ))}
      </form>
    </details>
  );
};
