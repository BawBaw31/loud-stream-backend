import { Hono } from "hono";
import users from "./routes/usersRoute";

const app = new Hono();

app.route("/users", users);

const port = parseInt(process.env.PORT) || 3000;

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
