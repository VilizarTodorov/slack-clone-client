import React from "react";

const Team = ({ name }) => {
  const char = name.charAt(0).toUpperCase();
  return <li>{char}</li>;
};

export default Team;
