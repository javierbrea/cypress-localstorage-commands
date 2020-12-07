import { useError } from "@data-provider/react";

import { cookiesAccepted } from "../../data/user-preferences";

import "./LocalStorageWarning.css";

export const LocalStorageWarning = () => {
  const error = useError(cookiesAccepted);

  if (!error) {
    return null;
  }

  return (
    <p id="localstorage-disabled-warning">
      ⚠️ LocalStorage is disabled. Received error:{" "}
      <span id="localstorage-error">{error.message}</span>
    </p>
  );
};
