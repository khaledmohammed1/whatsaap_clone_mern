import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Chat from "@mui/icons-material/Chat";
import { Avatar, IconButton } from "@mui/material";
import SidebarChats from "./SidebarChats";

function sideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://avatars.githubusercontent.com/u/103039958?s=400&u=e5e42275b8391f9439d966eeabe4b96e456a4143&v=4" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
      </div>
    </div>
  );
}

export default sideBar;
