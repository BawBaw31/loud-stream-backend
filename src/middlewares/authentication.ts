import { Context, Next } from "hono";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (c: Context, next: Next) => {
  const auth = c.req.headers.get("Authorization");

  if (!auth) {
    return c.json({ message: "Unauthorized" }, 401);
  } else {
    try {
      const [type, token] = auth.split(/\s+/);
      if (type !== "Bearer") throw new Error();
      const decoded = await verifyToken(token);
      c.set("user", decoded);
      // TODO: remove console.log
      console.log("decoded", decoded);
      await next();
    } catch (err) {
      return c.json({ message: "Unauthorized" }, 401);
    }
  }
};
