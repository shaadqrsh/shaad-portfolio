import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useMediaQuery = (query: string): boolean => {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onChange);
      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    [query]
  );

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
};
