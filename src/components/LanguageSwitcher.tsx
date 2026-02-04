"use client";

import { usePathname, useRouter } from "next/navigation";
import { Locale, locales } from "@/i18n/config";

const labels: Record<Locale, string> = {
    en: "English",
    ja: "日本語",
    zh: "中文",
    ko: "한국어",
};

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLanguageChange = (newLocale: Locale) => {
        if (newLocale === currentLocale) return;

        const segments = pathname.split("/");
        segments[1] = newLocale;
        const newPathname = segments.join("/");
        router.push(newPathname);
    };

    return (
        <div className="flex items-center space-x-1">
            <select
                value={currentLocale}
                onChange={(e) => handleLanguageChange(e.target.value as Locale)}
                className="bg-slate-100 border-none rounded-md px-2 py-1 text-sm font-bold text-slate-700 hover:bg-slate-200 focus:ring-2 focus:ring-slate-400 outline-none transition-all cursor-pointer"
            >
                {locales.map((locale) => (
                    <option key={locale} value={locale}>
                        {labels[locale]}
                    </option>
                ))}
            </select>
        </div>
    );
}
