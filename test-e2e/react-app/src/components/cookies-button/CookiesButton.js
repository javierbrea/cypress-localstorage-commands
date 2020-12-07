import PropTypes from "prop-types";

import "./CookiesButton.css";

export const CookiesButton = ({ visible, onClick, id, text, disabled }) => {
  if (!visible) {
    return null;
  }
  console.log(disabled);
  return (
    <button onClick={onClick} id={id} className="cookies-button" disabled={disabled}>
      {text}
    </button>
  );
};

CookiesButton.propTypes = {
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};
