import { useData, useError } from "@data-provider/react";

import CookiesButton from "../../components/cookies-button";
import { cookiesAccepted, acceptCookies } from "../../data/user-preferences";

const AcceptCookies = () => {
  const accepted = useData(cookiesAccepted);
  const error = useError(cookiesAccepted);
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

export default AcceptCookies;
