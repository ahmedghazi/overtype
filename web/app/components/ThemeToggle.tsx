"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import BtnIcon from "./ui/buttons/BtnIcon";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoids hydration mismatch on SSR
  }

  return (
    <BtnIcon
      icon='dark-mode'
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    />
  );
}
