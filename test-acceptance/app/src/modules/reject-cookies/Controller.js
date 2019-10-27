import { connect } from "@xbyorange/react-mercury";

import CookiesButton from "../../components/cookies-button";
import { cookiesAccepted, rejectCookies } from "../../data/user-preferences";

export const Controller = connect(() => ({
  visible: cookiesAccepted.read.getters.value,
  onClick: rejectCookies,
  text: "Reject cookies",
  id: "reject-cookies"
}))(CookiesButton);
