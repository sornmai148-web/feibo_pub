"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const NextProgressBar = () => (
  <ProgressBar
    height="4px"
    color="#fca311"
    options={{ showSpinner: true }}
    shallowRouting
  />
);
