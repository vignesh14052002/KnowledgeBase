const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
var cors = require("cors");
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

const local_users_db = {};
const local_chat_db = {};
const local_id_to_email = {};
// const { Server } = require("socket.io");

// const io = new Server(server);
const io = require("socket.io")(server, { cors: { origin: "*" } });
app.get("/", (req, res) => {
  // console.log("working");
  res.send("working");
});

app.get("/userContacts", (req, res) => {
  let contacts = ["Global", "user1", "user2", "user3", "user4", "user5"];
  let imgNum = [474, 65, 64, 550, 669, 777, 64, 65];
  contacts = contacts.map((d, i) => {
    return {
      name: d,
      email: d + "@gmail.com",
      isonline: false,
      imageNumber: imgNum[i],
    };
  });
  res.send(JSON.stringify(contacts));
});

//start
app.post("/contact", (req, res) => {
  // console.log(req.body);
  res.send(JSON.stringify({ a: "j" }));
});
app.post("/adduser", (req, res) => {
  // console.log(req.body);
  res.send(JSON.stringify({ a: "j" }));
});

//end
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    // console.log(local_id_to_email, socket.id);
    if (local_id_to_email[socket.id] != undefined) {
      local_users_db[local_id_to_email[socket.id]] = {
        id: socket.id,
        lastSeen: new Date().toLocaleString(),
        isonline: false,
      };
    }
    socket.broadcast.emit("status", {
      email: local_id_to_email[socket.id],
      isonline: false,
    });
    console.log("user disconnected", socket.id);
  });
  socket.on("typing", (msg) => {
    if (msg.receiver === "Global") {
      socket.broadcast.emit("typing", msg);
    } else {
      io.to(local_users_db[msg.receiver_email].id).emit("typing", msg);
    }
  });
  socket.on("chat", (msg) => {
    if (msg.receiver === "Global") {
      io.to(local_users_db[msg.sender_email].id).emit("chat", msg);
      socket.broadcast.emit("chat", msg);
    } else {
      io.to(local_users_db[msg.receiver_email].id).emit("chat", msg);
      io.to(local_users_db[msg.sender_email].id).emit("chat", msg);

      const convo_key = `${msg.sender_email}->${msg.receiver_email}`;
      const convo_key1 = `${msg.receiver_email}->${msg.sender_email}`;
      if (convo_key in local_chat_db) {
        local_chat_db[convo_key].push(msg);
      } else if (convo_key1 in local_chat_db) {
        local_chat_db[convo_key1].push(msg);
      } else {
        local_chat_db[convo_key] = [msg];
      }
    }
    // console.log(local_chat_db);
  });
  socket.on("setusers", (data) => {
    local_users_db[data.email] = {
      id: data.id,
      lastSeen: "not available",
      isonline: true,
    };
    local_id_to_email[data.id] = data.email;
    // console.log(local_users_db);
    socket.emit("status", getOnlineUsers(local_users_db));
    socket.broadcast.emit("status", { email: data.email, isonline: true });
  });
  socket.on("contact", (msg) => {
    // console.log("oncontact");
    // console.log("contact", msg);
    const convo_key = `${msg.sender_email}->${msg.receiver_email}`;
    const convo_key1 = `${msg.receiver_email}->${msg.sender_email}`;
    let conversation = [];
    if (convo_key in local_chat_db) conversation = local_chat_db[convo_key];
    if (convo_key1 in local_chat_db) conversation = local_chat_db[convo_key1];

    io.to(local_users_db[msg.sender_email].id).emit("convo", conversation);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});

function getOnlineUsers(data) {
  let online = [];
  for (const key of Object.keys(data)) {
    if (data[key].isonline) online.push(key);
  }
  return online;
}
