import openSocket from "socket.io-client";
const socket = openSocket(`${import.meta.env.VITE_BASE_URL}`);

function getStatus(cb) {
  socket.on("data", (data) => cb(null, data));
  socket.emit("getData", 2000);
}

export default getStatus;
