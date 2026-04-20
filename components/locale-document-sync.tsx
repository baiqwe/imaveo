"use client";

import { useEffect } from "react";

export function LocaleDocumentSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh" : "en";
  }, [locale]);

  return null;
}
