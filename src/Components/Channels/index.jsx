import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import SidebarListItem from "../../StyledComponents/SidebarListItem";
import AddChannelModal from "../AddChannelModal";
import InvitePeopleModal from "../InvitePeopleModal";
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

const UsernameHeader = styled.h3`
  padding-left: 10px;
  color: white;
  font-size: 16px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
`;

const SidebarListHeader = styled.li`
  padding-left: 5px;
`;

const Channels = ({ teamId, teamName, username, channels, users, isOwner }) => {
  const [isOpenAddChannel, setIsOpenAddChannel] = useState(false);
  const [isOpenInvitePeople, setIsOpenInvitePeople] = useState(false);

  return (
    <ChannelsWrapper>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      <UsernameHeader>{username}</UsernameHeader>

      <SidebarList>
        <SidebarListHeader>
          Channels {isOwner && <Icon onClick={() => setIsOpenAddChannel(true)} name="add circle" />}
        </SidebarListHeader>
        {channels.map((channel) => (
          <Channel teamId={teamId} channelId={channel.id} key={channel.id}>
            {channel.name}
          </Channel>
        ))}
      </SidebarList>
      <SidebarList>
        <SidebarListHeader>Direct Messages</SidebarListHeader>
        {users.map((user, index) => (
          <User key={index}>{user}</User>
        ))}
        {isOwner && <SidebarListItem onClick={() => setIsOpenInvitePeople(true)}>+ Invite People</SidebarListItem>}
      </SidebarList>

      <AddChannelModal
        teamId={teamId}
        isOpen={isOpenAddChannel}
        onClose={() => setIsOpenAddChannel(false)}
      ></AddChannelModal>

      <InvitePeopleModal
        teamId={teamId}
        isOpen={isOpenInvitePeople}
        onClose={() => setIsOpenInvitePeople(false)}
      ></InvitePeopleModal>
    </ChannelsWrapper>
  );
};

export default Channels;
