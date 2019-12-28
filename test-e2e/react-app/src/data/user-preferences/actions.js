import { userPreferences } from "./origins";

export const acceptCookies = () => {
  // save value directly in another localStorage key for an easier assertions example
  localStorage.setItem("cookies-accepted", true);
  return userPreferences.cookiesAccepted().update(true);
};

export const rejectCookies = () => {
  // save value directly in another localStorage key for an easier assertions example
  localStorage.setItem("cookies-accepted", false);
  return userPreferences.cookiesAccepted().update(false);
};
