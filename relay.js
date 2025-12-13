import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

let laptop = null;

console.log("Relay server running on port", PORT);

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.role === "laptop") {
      laptop = ws;
      console.log("Laptop connected");
    }

    if (data.role === "phone" && laptop) {
      laptop.send(msg);
    }
  });
});
