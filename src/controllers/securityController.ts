import * as bcrypt from "bcryptjs";
import { Context } from "hono";
import db from "../utils/db";
import { createToken } from "../utils/jwt";

export const login = async (c: Context) => {
  const body: any = await c.req.json();
  try {
    const { email, password } = body;
    const userStmt = db.prepare(`SELECT * FROM users WHERE email = ?`, [email]);
    const user = userStmt.get();
    if (!user) {
      return c.json({ message: "Invalid credentials" }, 401);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return c.json({ message: "Invalid credentials" }, 401);
    }
    return c.json({
      message: "Logged in successfully",
      token: createToken(user),
    });
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
};
