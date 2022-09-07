import * as bcrypt from "bcryptjs";
import { Context } from "hono";
import { userSchema } from "../schemas/usersSchema";
import db from "../utils/db";

export const getAllUsers = (c: Context) => {
  const usersStmt = db.query("SELECT * FROM users");
  return c.json({ users: usersStmt.all() });
};

export const getUser = async (c: Context) => {
  const id = c.req.param("id");
  const userStmt = db.prepare(`SELECT * FROM users WHERE id = ${id}`);
  return c.json({ user: userStmt.get() });
};

export const createUser = async (c: Context) => {
  const body = await c.req.json();
  try {
    const { name, email, password } = await userSchema.validateAsync(body);
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.run(query, [name, email, hashPassword(password)]);
    return c.json({
      user: { name: name, email: email },
      message: "User created successfully",
    });
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
};

export const updateUser = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  try {
    const { name, email, password } = await userSchema.validateAsync(body);
    const query =
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
    db.run(query, [name, email, hashPassword(password), id]);
    return c.json({
      user: { name: name, email: email },
      message: "User updated successfully",
    });
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
};

export const deleteUser = async (c: Context) => {
  const id = c.req.param("id");
  db.run(`DELETE FROM users WHERE id = ${id}`);
  return c.json({ message: `User {id} deleted` });
};

const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};
