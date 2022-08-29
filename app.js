const express = require("express");
const path = require("path");

const app = express();

app.use("/", express.static("./client/build"));
app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});

app.listen(80, (req, res) => {
  console.log("Server is listening to port 80.");
});
