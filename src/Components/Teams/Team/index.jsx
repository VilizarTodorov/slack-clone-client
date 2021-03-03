import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { VIEW_TEAM, VIEW_TEAM_LINK_ROUTE } from "../../../constants/routes";

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

const Team = ({ name, id }) => {
  const char = name.charAt(0).toUpperCase();
  return (
    <Link to={`${VIEW_TEAM_LINK_ROUTE}/${id}`}>
      <TeamListItem>{char}</TeamListItem>
    </Link>
  );
};

export default Team;
