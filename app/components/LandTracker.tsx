"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires the "land" funnel event once per page view. Renders nothing. */
export function LandTracker() {
  useEffect(() => {
    track("land");
  }, []);
  return null;
}
