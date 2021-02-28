import React from "react";
import AppLayout from "../../Components/AppLayout";
import Teams from "../../Components/Teams";
import Channels from "../../Components/Channels";
import Header from "../../Components/Header";
import Messages from "../../Components/Messages";
import SendMessage from "../../Components/SendMessage";

const Team = (props) => {
  return (
    <AppLayout>
      <Teams teams={["bob team", "ivan team", "mario team"]}></Teams>
      <Channels
        teamName="The team"
        username="The username"
        channels={["channel 1", "channel 2", "channel 3"]}
        users={["user 1", "user 2", "user 3"]}
      ></Channels>
      <Header>general</Header>
      <Messages messages={["message 1", "message 2", "message 3"]}></Messages>
      <SendMessage channelName="general"></SendMessage>
    </AppLayout>
  );
};

export default Team;
