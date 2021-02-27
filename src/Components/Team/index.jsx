import React from "react";
import AppLayout from "../../StyledComponents/AppLayout";
import Teams from "../../StyledComponents/Teams";
import Channels from "../../StyledComponents/Channels";
import Header from "../../StyledComponents/Header";
import Messages from "../../StyledComponents/Messages";
import Input from "../../StyledComponents/Input";

const Team = (props) => {
  return (
    <AppLayout>
      <Teams>Teams</Teams>
      <Channels>Channels</Channels>
      <Header>Header</Header>
      <Messages>
        <ul className="messages-list">
          <li>message 1</li>
          <li>message 2</li>
        </ul>
      </Messages>
      <Input>
        <input type="text" />
      </Input>
    </AppLayout>
  );
};

export default Team;
