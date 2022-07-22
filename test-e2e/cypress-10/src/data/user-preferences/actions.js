import { userPreferences } from "./origins";

export const acceptCookies = () => {
  // save value directly in another localStorage key for an easier assertions example
  try {
    localStorage.setItem("cookies-accepted", true);
  } catch (err) {
    console.log("Error setting cookies-accepted", err);
  }

  return userPreferences.queries
    .cookiesAccepted()
    .update(true)
    .catch((err) => {
      console.log("Error setting user-preferences", err);
    });
};

export const rejectCookies = () => {
  // save value directly in another localStorage key for an easier assertions example
  try {
    localStorage.setItem("cookies-accepted", false);
  } catch (err) {
    console.log("Error setting cookies-accepted", err);
  }
  return userPreferences.queries
    .cookiesAccepted()
    .update(false)
    .catch((err) => {
      console.log("Error setting user-preferences", err);
    });
};
