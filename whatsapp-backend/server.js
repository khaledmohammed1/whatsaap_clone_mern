//importing app_config middleware DB_config app routes listen
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1402217",
  key: "69282992884289c7626e",
  secret: "49f643dfa029e03c4b0f",
  cluster: "eu",
  useTLS: true,
});

//midleware
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

//Db config
mongoose.connect(
  `mongodb+srv://<secretUser>:<SecretPassword>@cluster0.2vyta.mongodb.net/<DB_name>?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  const myCollection = db.collection("messagecontents");
  const changeStream = myCollection.watch();
  changeStream.on("change", (change) => {
    console.log("A change occured", change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Erro trigger pusher");
    }
  });
});

//routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => console.log(`listen on localhost: ${port}`));
