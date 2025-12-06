import { Icon } from "../common/icon";
import { SROnly } from "../shared/SROnly";

export const Filter = () => {
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
  return (
    <details className="filter relative">
      <summary className="filter__summary outstand">
        Filter by Region{" "}
        <span className=" ml-8">
          <Icon name="chevron-down filter__icon" />
        </span>
      </summary>
      <form className="outstand filter__list">
        {regions.map((region, key) => (
          <label key={key} className="cursor-pointer">
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
