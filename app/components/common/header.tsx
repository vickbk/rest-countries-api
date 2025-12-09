"use client";
import { useEffect, useState } from "react";
import { CommonContainer } from "./common-container";
import setMemoItem from "@/app/lib/memorization/set-item";
import getMemoItem from "@/app/lib/memorization/get-item";
import { SROnly } from "../shared/SROnly";

export const Header = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  useEffect(() => {
    let savedTheme = getMemoItem<"light" | "dark" | undefined>("theme");
    if (!savedTheme)
      savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkTheme(savedTheme === "dark");
  }, []);
  useEffect(() => {
    setMemoItem("theme", darkTheme ? "dark" : "light");
    document.documentElement.setAttribute(
      "theme",
      darkTheme ? "dark" : "light"
    );
  }, [darkTheme]);
  return (
    <header className="outstand py-4 shadow">
      <CommonContainer className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">Where in the world?</h1>
        <button
          className="outstand-button py-4 sm:p-4 rounded-lg"
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
        >
          <i className={`bi bi-${darkTheme ? "sun" : "moon-fill"}`}></i>
          <SROnly>Switch to</SROnly> {darkTheme ? "Light" : "Dark"} Mode
        </button>
      </CommonContainer>
    </header>
  );
};
