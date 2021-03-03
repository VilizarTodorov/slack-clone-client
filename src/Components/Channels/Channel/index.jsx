import React from "react";
import { Link } from "react-router-dom";
import { VIEW_TEAM_LINK_ROUTE } from "../../../constants/routes";
import SidebarListItem from "../../../StyledComponents/SidebarListItem";

const Channel = ({ teamId, channelId, children }) => {
  return (
    <Link to={`${VIEW_TEAM_LINK_ROUTE}/${teamId}/${channelId}`}>
      <SidebarListItem>#{children}</SidebarListItem>
    </Link>
  );
};

export default Channel;
