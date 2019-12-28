import React from "react";
import PropTypes from "prop-types";

import "./CookiesButton.css";

export const CookiesButton = ({ visible, onClick, id, text }) => {
  if (!visible) {
    return null;
  }
  return (
    <button onClick={onClick} id={id} className="cookies-button">
      {text}
    </button>
  );
};

CookiesButton.propTypes = {
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string,
  text: PropTypes.string
};
