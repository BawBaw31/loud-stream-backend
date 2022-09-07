import { Context, Next } from "hono";
import { verifyToken } from "../utils/jwt";

module.exports = async (c: Context, next: Next) => {
  const auth = c.req.headers.get("Authorization");
  if (!auth) {
    c.status(401);
  } else {
    try {
      const [type, token] = auth.split(/\s+/);
      if (type !== "Bearer") throw new Error();
      const decoded = await verifyToken(token);
      c.set("user", decoded);
      console.log("decoded", decoded);
      await next();
    } catch (err) {
      c.status(401);
    }
  }
};
