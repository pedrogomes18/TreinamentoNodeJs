import express from "express";
import path from "path";
import routes from "./routes";

const app = express();
app.use(
  "/docs",
  express.static(path.join(__dirname, "..", "..", "..", "..", "docs"))
);
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("Server Started on port 3333! 😉");
});
