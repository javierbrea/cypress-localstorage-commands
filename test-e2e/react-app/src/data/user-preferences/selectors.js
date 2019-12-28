import { Selector } from "@data-provider/core";

import { userPreferences } from "./origins";

export const cookiesAccepted = new Selector(
  {
    provider: userPreferences,
    query: userPreferences.customQueries.cookiesAccepted
  },
  cookiesAcceptedResult => cookiesAcceptedResult
);
