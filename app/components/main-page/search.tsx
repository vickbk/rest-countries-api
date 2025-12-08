"use client";
import { useDebouncedCallback } from "use-debounce";
import { SROnly } from "../shared/SROnly";
import { usePathname, useRouter } from "next/navigation";
import { updateSearchParams } from "@/app/lib/update-search-params";
import { Icon } from "../common/icon";
import { useRef } from "react";

export const Search = ({ country }: { country: string }) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchCountry = useDebouncedCallback((value: string) => {
    replace(
      updateSearchParams({ pathname, value, param: "country", reset: ["page"] })
    );
  }, 300);
  const clearSearch = () => {
    searchCountry("");
    if (inputRef.current) inputRef.current.value = "";
  };
  return (
    <label className="relative grow lg:max-w-1/3">
      <i className="bi bi-search absolute top-1/2 -translate-y-1/2 left-6"></i>{" "}
      {country !== "" && (
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-6"
          onClick={() => clearSearch()}
        >
          <Icon name="x-lg" />
          <SROnly>Clear search text</SROnly>
        </button>
      )}
      <SROnly>Entrer a country name</SROnly>
      <input
        className="outstand w-full  p-4 rounded-lg pl-16"
        type="text"
        placeholder="search for a country..."
        defaultValue={country}
        ref={inputRef}
        onChange={({ target: { value } }) => searchCountry(value)}
      />
    </label>
  );
};
