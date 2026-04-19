"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark";

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const stored = (localStorage.getItem("everymos-theme") as Mode | null) ?? "light";
    setMode(stored);
    document.documentElement.dataset.theme = stored;
  }, []);

  function toggle() {
    const next: Mode = mode === "light" ? "dark" : "light";
    setMode(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("everymos-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
      className="mono rounded-md border border-[color:var(--color-rule)] bg-white px-2 py-1 text-xs hover:border-[color:var(--color-signal)]"
    >
      {mode === "light" ? "dark" : "light"}
    </button>
  );
}
