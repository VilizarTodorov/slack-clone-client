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

const Channels = ({ teamName, username, channels, users }) => {
  return (
    <ChannelsWrapper>
      <div>
        {teamName}
        {username}
      </div>
      <div>
        <ul>
          <li>Channels</li>
          {channels.map((channel, index) => (
            <Channel key={index}>{channel}</Channel>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          <li>Direct Messages</li>
          {users.map((user, index) => (
            <User key={index}>{user}</User>
          ))}
        </ul>
      </div>
    </ChannelsWrapper>
  );
};

export default Channels;
