import { LocalStorage } from "@data-provider/browser-storage";

export const userPreferences = new LocalStorage({
  id: "user-preferences",
  storageFallback: false,
});

userPreferences.addQuery("cookiesAccepted", () => ({
  prop: "cookiesAccepted",
}));
