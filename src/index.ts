import { Hono } from "hono";
import { logger } from "hono/logger";
import security from "./routes/securityRoute";
import users from "./routes/usersRoute";

const app = new Hono();

app.use("*", logger());

app.route("/users", users);
app.route("security", security);

const port = parseInt(process.env.PORT) || 3000;

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
