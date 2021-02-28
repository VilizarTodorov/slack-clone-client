import React, { Fragment } from "react";
import styled from "styled-components";
import SidebarListItem from "../../../StyledComponents/SidebarListItem";

const Green = styled.span`
  margin-right: 5px;
  color: green;
`;

const Bubble = ({ on }) => {
  return <Fragment>{on ? <Green>●</Green> : "○"}</Fragment>;
};

const User = ({ children }) => {
  return (
    <SidebarListItem>
      <Bubble on={true}></Bubble>
      {children}
    </SidebarListItem>
  );
};

export default User;
