"use client";
import { useEffect, useState } from "react";
import { CommonContainer } from "./common-container";

export const Header = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    console.log(prefersDark);
  }, [darkTheme]);
  return (
    <header>
      <CommonContainer className="flex justify-between">
        <h1>Where in the world?</h1>
        <button type="button" onClick={() => setDarkTheme(!darkTheme)}>
          <i className="bi bi-moon"></i>
          Dark Mode
        </button>
      </CommonContainer>
    </header>
  );
};
