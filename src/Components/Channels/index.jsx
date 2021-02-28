import React from "react";
import styled from "styled-components";
import Channel from "./Channel";
import User from "./User";

const ChannelsWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  padding: 10px;
  color: white;
  font-size: 20px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
`;

const SidebarListHeader = styled.li`
  padding-left: 5px;
`;

const Channels = ({ teamName, username, channels, users }) => {
  return (
    <ChannelsWrapper>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
      <SidebarList>
        <SidebarListHeader>Channels</SidebarListHeader>
        {channels.map((channel, index) => (
          <Channel key={index}>{channel}</Channel>
        ))}
      </SidebarList>
      <SidebarList>
        <SidebarListHeader>Direct Messages</SidebarListHeader>
        {users.map((user, index) => (
          <User key={index}>{user}</User>
        ))}
      </SidebarList>
    </ChannelsWrapper>
  );
};

export default Channels;
