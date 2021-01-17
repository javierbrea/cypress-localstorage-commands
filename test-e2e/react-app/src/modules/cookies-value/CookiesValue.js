import { withData } from "@data-provider/react";

import CookiesValue from "../../components/cookies-value";
import { cookiesAccepted } from "../../data/user-preferences";

export default withData(cookiesAccepted, "value")(CookiesValue);
