import React from "react";
import SidebarListItem from "../../../StyledComponents/SidebarListItem";

const Channel = ({ children }) => {
  return <SidebarListItem>#{children}</SidebarListItem>;
};

export default Channel;
