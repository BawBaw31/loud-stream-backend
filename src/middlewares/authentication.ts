import { Context, Next } from "hono";
import { verifyToken } from "../utils/jwt";
import * as jwt from "jsonwebtoken";

export const authenticate = async (c: Context, next: Next) => {
  const auth = c.req.headers.get("Authorization");

  if (!auth) {
    return c.json({ message: "Unauthorized" }, 401);
  } else {
    try {
      const [type, token] = auth.split(" ");
      if (type !== "Bearer") throw new Error();
      const decoded = jwt.verify(token, {
        key: "secret",
        passphrase: "secret",
      });
      c.set("user", decoded);
      // TODO: remove console.log
      console.log("decoded", decoded);
      await next();
    } catch (err) {
      console.log(err);
      return c.json({ message: "Unauthorized" }, 401);
    }
  }
};
