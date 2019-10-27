import { Selector } from "@xbyorange/mercury";

import { userPreferences } from "./origins";

export const cookiesAccepted = new Selector(
  {
    source: userPreferences,
    query: userPreferences.customQueries.cookiesAccepted
  },
  cookiesAcceptedResult => cookiesAcceptedResult
);
