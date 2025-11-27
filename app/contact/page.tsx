"use client";

import { Suspense } from "react";
import ContactPage from "./ContactPage";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <ContactPage />
    </Suspense>
  );
}
