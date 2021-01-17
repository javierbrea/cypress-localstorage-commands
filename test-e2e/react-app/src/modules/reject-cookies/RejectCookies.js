import { useData } from "@data-provider/react";

import CookiesButton from "../../components/cookies-button";
import { cookiesAccepted, rejectCookies } from "../../data/user-preferences";

const RejectCookies = () => {
  const visible = useData(cookiesAccepted);
  return (
    <CookiesButton
      text="Reject cookies"
      id="reject-cookies"
      onClick={rejectCookies}
      visible={visible}
    />
  );
};

export default RejectCookies;
