import { ODPTTitle } from "./odptClient";
import { Locale } from "@/i18n/config";

export function getLastSegment(input: string): string {
  return input.split(".").pop() || "";
}

export function getLocalizedTitle(title: ODPTTitle, locale: Locale): string {
  if (!title) return "";
  
  if (locale === "zh") {
    return title["zh-Hans"] || title["zh-Hant"] || title.en || title.ja;
  }
  
  const val = (title as unknown as Record<string, string | undefined>)[locale];
  return val || title.en || title.ja;
}

export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/{(\w+)}/g, (_, key) => {
    return values[key]?.toString() ?? `{${key}}`;
  });
}
