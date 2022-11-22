import { Context, Hono } from "hono";
import { logger } from "hono/logger";
import { authenticate } from "./middlewares/authentication";
import security from "./routes/securityRoute";
import users from "./routes/usersRoute";
import * as jwt from "jsonwebtoken";
// import * as jose from "jose";

const app = new Hono();

app.use("*", logger());
app.use("/users/*", authenticate);
app.route("/users", users);
app.route("/security", security);

// TODO remove this
app.get("/", (c: Context) => {
  const auth = c.req.headers.get("Authorization");
  try {
    console.log("auth", auth.split(" ")[1]);
    const decoded = jwt.verify(auth.split(" ")[1], "secret");
    // const decoded = jose.decodeJwt(auth.split(" ")[1]);
    return c.json({ message: "Hello World", decoded: decoded });
  } catch (err) {
    console.log(err);
  }
});

const port = parseInt(process.env.PORT) || 3000;

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
