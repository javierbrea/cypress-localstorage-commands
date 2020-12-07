import { withData, withError } from "@data-provider/react";
import PropTypes from "prop-types";

import CookiesButton from "../../components/cookies-button";
import { cookiesAccepted, acceptCookies } from "../../data/user-preferences";

const AcceptCookiesModule = ({ accepted, error }) => {
  return (
    <CookiesButton
      visible={!accepted}
      text="Accept cookies"
      id="accept-cookies"
      onClick={acceptCookies}
      disabled={!!error}
    />
  );
};

AcceptCookiesModule.propTypes = {
  accepted: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
};

export const Controller = withError(cookiesAccepted)(
  withData(cookiesAccepted, "accepted")(AcceptCookiesModule)
);
