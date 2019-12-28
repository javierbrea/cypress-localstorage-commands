import { LocalStorage } from "@data-provider/browser-storage";

export const userPreferences = new LocalStorage(
  "user-preferences",
  {
    cookiesAccepted: false
  },
  {
    queriesDefaultValue: true
  }
);

userPreferences.addCustomQueries({
  cookiesAccepted: () => "cookiesAccepted"
});
