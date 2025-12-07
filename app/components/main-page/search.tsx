"use client";
import { useDebouncedCallback } from "use-debounce";
import { SROnly } from "../shared/SROnly";
import { usePathname, useRouter } from "next/navigation";

export const Search = ({ country }: { country: string }) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams();
  const searchCountry = useDebouncedCallback((value: string) => {
    if (!value) {
      params.delete("country");
    } else params.set("country", value);
    replace(`${pathname}?${params.toString()}`);
    console.log(pathname);
  }, 300);
  return (
    <label className="relative grow lg:max-w-1/3">
      <i className="bi bi-search absolute top-1/2 -translate-y-1/2 left-6"></i>
      <SROnly>Entrer a country name</SROnly>
      <input
        className="outstand w-full  p-4 rounded-lg pl-16"
        type="text"
        placeholder="search for a country..."
        defaultValue={country}
        onChange={({ target: { value } }) => searchCountry(value)}
      />
    </label>
  );
};
