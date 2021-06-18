import React from "react";

const Button = (props) => {
  const { handleClick, buttonLabel } = props;
  return <button onClick={handleClick}>{buttonLabel}</button>
};
export default Button;