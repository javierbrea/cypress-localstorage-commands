import { userPreferences } from "./origins";

export const acceptCookies = () => userPreferences.cookiesAccepted().update(true);

export const rejectCookies = () => userPreferences.cookiesAccepted().update(false);
