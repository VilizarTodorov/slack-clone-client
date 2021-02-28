import React from "react";
import styled from "styled-components";

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: white;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border: solid thick #767676;
  }
`;

const Team = ({ name }) => {
  const char = name.charAt(0).toUpperCase();
  return <TeamListItem>{char}</TeamListItem>;
};

export default Team;
