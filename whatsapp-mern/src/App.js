import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("messages/sync").then((res) => {
      setMessages(res.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("69282992884289c7626e", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
        {/* sidebar */}
        <Sidebar />
        {/* Chat component */}
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
