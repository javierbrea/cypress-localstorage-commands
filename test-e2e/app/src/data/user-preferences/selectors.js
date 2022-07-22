import { Selector } from "@data-provider/core";

import { userPreferences } from "./origins";

export const cookiesAccepted = new Selector(userPreferences.queries.cookiesAccepted(), {
  id: "cookies-accepted",
});
