import i18next from "i18next";
import type { InitOptions } from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const config: InitOptions = {
  fallbackLng: "en",
  lng: "en",
  debug: true,
  detection: {
    order: ["querystring", "cookie"],
    caches: ["cookie"],
  },
  interpolation: {
    escapeValue: false,
  },
};

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(config); 

export default i18next;
