import React from "react";
import { withData } from "@data-provider/react";

import CookiesButton from "../../components/cookies-button";
import { cookiesAccepted, rejectCookies } from "../../data/user-preferences";

const RejectCookiesModule = props => {
  return (
    <CookiesButton text="Reject cookies" id="reject-cookies" onClick={rejectCookies} {...props} />
  );
};

export const Controller = withData(cookiesAccepted, "visible")(RejectCookiesModule);
