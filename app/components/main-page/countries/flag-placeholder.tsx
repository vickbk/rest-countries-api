import { Country } from "@yusifaliyevpro/countries";

export function FlagPlaceholder({ flag }: { flag: Country["flag"] }) {
  return (
    <figure>
      <svg
        className="absolute inset-0 w-full h-full text-zinc-300/40 dark:text-zinc-700/30 p-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5A2.5 2.5 0 0019 9.5V8a.5.5 0 01.5-.5h.5M12 2a10 10 0 100 20 10 10 0 000-20z"
        />
      </svg>
      <figcaption className="sr-only">{flag.description}</figcaption>
    </figure>
  );
}
