"use client";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../common/icon";
import { SROnly } from "../shared/SROnly";
import { updateSearchParams } from "@/app/lib/update-search-params";
import { useRef } from "react";

export const Filter = () => {
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

  return (
    <details className="filter relative" ref={detailsElement}>
      <summary className="filter__summary outstand">
        Filter by Region{" "}
        <span className=" ml-8">
          <Icon name="chevron-down filter__icon" />
        </span>
      </summary>
      <form
        className="outstand filter__list"
        onInput={(e) => valueChange((e.target as HTMLInputElement).value)}
      >
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
