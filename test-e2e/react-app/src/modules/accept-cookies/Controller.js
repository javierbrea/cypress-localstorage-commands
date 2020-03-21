import React from "react";
import { withData } from "@data-provider/react";
import PropTypes from "prop-types";

import CookiesButton from "../../components/cookies-button";
import { cookiesAccepted, acceptCookies } from "../../data/user-preferences";

const AcceptCookiesModule = ({ accepted }) => {
  return (
    <CookiesButton
      visible={!accepted}
      text="Accept cookies"
      id="accept-cookies"
      onClick={acceptCookies}
    />
  );
};

AcceptCookiesModule.propTypes = {
  accepted: PropTypes.bool
};

export const Controller = withData(cookiesAccepted, "accepted")(AcceptCookiesModule);
