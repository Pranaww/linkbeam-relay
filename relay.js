import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

let laptop = null;

console.log("Relay server running on port", PORT);
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    console.log("RAW MESSAGE:", msg.toString());

    const data = JSON.parse(msg);

    if (data.role === "laptop") {
      laptop = ws;
      console.log("Laptop registered");
    }

    if (data.role === "phone") {
      console.log("Phone message received");
      if (laptop) {
        laptop.send(msg);
        console.log("Forwarded to laptop");
      } else {
        console.log("NO LAPTOP CONNECTED");
      }
    }
  });
});

