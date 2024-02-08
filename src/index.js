const express = require("express");

const app = express();
app.get("/", (resquest, response) => {
  return response.json({ message: "Hello Pedro" });
});
app.listen(3333, () => {
  console.log("BackEnd Started!😉");
});
