import { Hono } from "hono";
import * as controller from "../controllers/usersController";

const users = new Hono();

users.get("/", controller.getAllUsers);

users.get("/:id", controller.getUser);

users.post("/", controller.createUser);

users.put("/:id", controller.updateUser);

users.delete("/:id", controller.deleteUser);

export default users;
