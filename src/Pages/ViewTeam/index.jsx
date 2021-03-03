import React from "react";
import AppLayout from "../../Components/AppLayout";
import Teams from "../../Components/Teams";
import Channels from "../../Components/Channels";
import Header from "../../Components/Header";
import Messages from "../../Components/Messages";
import SendMessage from "../../Components/SendMessage";
import { useQuery } from "@apollo/client";
import { allTeamsQuery } from "../../Queries";
import { useParams } from "react-router-dom";
import decode from "jwt-decode";

const ViewTeam = (props) => {
  const params = useParams();
  console.log(params);
  const allTeams = useQuery(allTeamsQuery);
  console.log(allTeams);

  if (allTeams.loading) {
    return <div>...Loading</div>;
  }

  let username = "";
  const team = params.teamId ? allTeams.data.allTeams.find((x) => x.id == params.teamId) : allTeams.data.allTeams[0];

  try {
    const token = localStorage.getItem("token");
    const { user } = decode(token);
    username = user.username;
  } catch (err) {}

  return (
    <AppLayout>
      <Teams teams={allTeams.data.allTeams}></Teams>
      <Channels
        teamId={team.id}
        teamName={team.name}
        username={username}
        channels={team.channels}
        users={["user 1", "user 2", "user 3"]}
      ></Channels>
      <Header>general</Header>
      <Messages messages={["message 1", "message 2", "message 3"]}></Messages>
      <SendMessage channelName="general"></SendMessage>
    </AppLayout>
  );
};

export default ViewTeam;
