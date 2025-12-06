"use client";
import { useState } from "react";

function removeNameDetails(name: string) {
  const endIndex = name.indexOf("(");
  return name.substring(0, endIndex === -1 ? Infinity : endIndex);
}

export const ColorsHelper = () => {
  const [colors, setColors] = useState("");
  const sassColors = colors
    .split("\n")
    .map((color) => color.replaceAll(/-|hsl\(|\)|,/g, "").split(":"));
  return (
    <section>
      <label className="mb-4 flex gap-4">
        {" "}
        Colors list
        <textarea
          className="border grow resize-none p-2"
          name="colors"
          value={colors}
          onChange={({ target: { value } }) => setColors(value)}
          required
          rows={3}
        />
      </label>

      <ul>
        {sassColors.map(
          ([name, color]) =>
            name && (
              <li key={name}>
                {removeNameDetails(name)
                  .trim()
                  .replaceAll(" ", "-")
                  .toLowerCase()}
                :{color},
              </li>
            )
        )}
      </ul>
    </section>
  );
};
