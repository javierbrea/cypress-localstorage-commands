import { connect } from "@data-provider/connector-react";

import CookiesValue from "../../components/cookies-value";
import { cookiesAccepted } from "../../data/user-preferences";

export const Controller = connect(() => ({
  value: cookiesAccepted.read.getters.value
}))(CookiesValue);
