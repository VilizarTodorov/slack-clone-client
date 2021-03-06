import React from "react";
import AppLayout from "../../Components/AppLayout";
import Teams from "../../Components/Teams";
import Channels from "../../Components/Channels";
import Header from "../../Components/Header";
import Messages from "../../Components/Messages";
import SendMessage from "../../Components/SendMessage";
import { useQuery } from "@apollo/client";
import { allTeamsQuery } from "../../Queries";
import { Redirect, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { withAuthorization } from "../../HOCs";
import { CREATE_TEAM } from "../../constants/routes";

const ViewTeam = (props) => {
  const params = useParams();
  console.log(params);
  const allTeams = useQuery(allTeamsQuery);
  console.log(allTeams);

  if (allTeams.loading) {
    return <div>...Loading</div>;
  }

  const teams = [...allTeams.data.allTeams, ...allTeams.data.inviteTeams];

  const parsedTeamId = Number(params.teamId);
  const team = parsedTeamId ? teams.find((x) => x.id == params.teamId) : teams[0];

  if (!team) {
    debugger;
    return <Redirect to={CREATE_TEAM} />;
  }

  const parsedChannelId = Number(params.channelId);
  const channel = parsedChannelId ? team.channels.find((x) => x.id == params.channelId) : team.channels[0];

  let username = "";
  let isOwner = false;
  try {
    const token = localStorage.getItem("token");
    const { user } = jwt_decode(token);
    username = user.username;
    isOwner = user.id === team.owner;
  } catch (err) {}

  return (
    <AppLayout>
      <Teams teams={teams}></Teams>
      <Channels
        teamId={team.id}
        teamName={team.name}
        username={username}
        channels={team.channels}
        users={["user 1", "user 2", "user 3"]}
        isOwner={isOwner}
      ></Channels>
      <Header>{channel.name}</Header>
      <Messages channelId={channel.id}></Messages>
      <SendMessage channelName={channel.name} channelId={channel.id}></SendMessage>
    </AppLayout>
  );
};

const condition = (user) => {
  try {
    jwt_decode(user.token);
    jwt_decode(user.refreshToken);
  } catch (error) {
    return false;
  }
  return true;
};

export default withAuthorization(condition)(ViewTeam);
