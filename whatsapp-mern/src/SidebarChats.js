import React from "react";
import "./SidebarChats.css";
import { Avatar } from "@mui/material";

function SidebarChats() {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat_info">
        <h2>Room Name</h2>
        <p>last message in the Room</p>
      </div>
    </div>
  );
}

export default SidebarChats;
