import React from "react";

const UserInput = (props) => {
  const { handleChange, placeholder, ...rest } = props;
  return <input onChange={handleChange} placeholder={placeholder} type="text" {...rest} />;
};
export default UserInput;
