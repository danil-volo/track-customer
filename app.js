const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use("/", express.static("./client/build"));

let clients = [];

app.get("/admin/clients", (req, res) => {
  res.json(clients);
});

app.post("/client", (req, res) => {
  const cip = req.ip;
  if (!clients.filter(({ ip }) => ip === cip).length)
    clients.push({ ...req.body, ip: cip });
  res.json("Ok");
});

app.post("/window-closed", (req, res) => {
  const cip = req.ip;
  clients = clients.filter(({ ip }) => ip !== cip);
});

app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});

app.listen(80, (req, res) => {
  console.log("Server is listening to port 80.");
});
