"use client";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../common/bi-icon";
import { SROnly } from "../shared/SROnly";
import { updateSearchParams } from "@/app/lib/update-search-params";
import { useEffect, useRef } from "react";
import { Regions } from "@/app/lib/countries";

export const Filter = ({ region }: { region: Regions }) => {
  const regions = [
    "Africa",
    "Asia",
    "Europe",
    "Oceania",
    "Americas",
    "Antarctic",
  ];
  const pathname = usePathname();
  const { replace } = useRouter();

  const detailsElement = useRef<HTMLDetailsElement>(null);

  const valueChange = (value: string) => {
    replace(
      updateSearchParams({ param: "region", value, pathname, reset: ["page"] })
    );
    detailsElement.current?.removeAttribute("open");
  };

  useEffect(() => {
    function closeDetails({ target }: PointerEvent) {
      if (!detailsElement.current?.contains(target as Node))
        detailsElement.current?.removeAttribute("open");
    }
    window.addEventListener("click", closeDetails);
    return () => window.removeEventListener("click", closeDetails);
  }, []);

  return (
    <details className="filter relative shadow-2xl" ref={detailsElement}>
      <summary className="filter__summary outstand outstand-button">
        Filter by Region{" "}
        <span className=" ml-8">
          <Icon name="chevron-down filter__icon" />
        </span>
      </summary>
      <form
        className="outstand filter__list shadow-2xl"
        onInput={(e) => valueChange((e.target as HTMLInputElement).value)}
      >
        {regions.map((reg, key) => (
          <label key={key} className="cursor-pointer flex justify-between">
            {reg} <SROnly>region</SROnly>{" "}
            {reg === region && <Icon name="check2-all" />}
            <input
              type="radio"
              name="region"
              className="sr-only"
              value={reg}
              defaultChecked={reg === region}
            />
          </label>
        ))}
        {region !== "" && (
          <label className="cursor-pointer flex justify-between text-red-500">
            Clear <SROnly>region</SROnly> <Icon name="trash" />
            <input type="radio" name="region" className="sr-only" value={""} />
          </label>
        )}
      </form>
    </details>
  );
};
