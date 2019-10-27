import { connect } from "@xbyorange/react-mercury";

import CookiesButton from "../../components/cookies-button";
import { cookiesAccepted, acceptCookies } from "../../data/user-preferences";

export const Controller = connect(
  () => ({
    accepted: cookiesAccepted.read.getters.value,
    onClick: acceptCookies,
    text: "Accept cookies",
    id: "accept-cookies"
  }),
  props => ({
    ...props,
    visible: !props.accepted
  })
)(CookiesButton);
