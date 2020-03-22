import { LocalStorage } from "@data-provider/browser-storage";

export const userPreferences = new LocalStorage("user-preferences", {
  initialState: {
    data: {
      cookiesAccepted: false,
    },
  },
});

userPreferences.addQuery("cookiesAccepted", () => ({
  prop: "cookiesAccepted",
}));
