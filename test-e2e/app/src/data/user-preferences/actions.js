import { userPreferences } from "./origins";

function log(...args) {
  // eslint-disable-next-line no-console
  console.log.apply(console, args);
}

export const acceptCookies = () => {
  // save value directly in another localStorage key for an easier assertions example
  try {
    localStorage.setItem("cookies-accepted", true);
  } catch (err) {
    log("Error setting cookies-accepted", err);
  }

  return userPreferences.queries
    .cookiesAccepted()
    .update(true)
    .catch((err) => {
      log("Error setting user-preferences", err);
    });
};

export const rejectCookies = () => {
  // save value directly in another localStorage key for an easier assertions example
  try {
    localStorage.setItem("cookies-accepted", false);
  } catch (err) {
    log("Error setting cookies-accepted", err);
  }
  return userPreferences.queries
    .cookiesAccepted()
    .update(false)
    .catch((err) => {
      log("Error setting user-preferences", err);
    });
};
