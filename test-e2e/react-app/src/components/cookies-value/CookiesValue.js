import React from "react";
import PropTypes from "prop-types";

export const CookiesValue = ({ value }) => {
  return (
    <p>
      Cookies are currently <span id="cookies-value">{value ? "accepted" : "rejected"}</span>
    </p>
  );
};

CookiesValue.propTypes = {
  value: PropTypes.bool
};
