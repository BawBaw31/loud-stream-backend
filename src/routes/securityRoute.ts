import { Hono } from "hono";
import * as userController from "../controllers/usersController";
import * as securityController from "../controllers/securityController";

const security = new Hono();

security.post("/register", userController.createUser);

security.post("/login", securityController.login);

export default security;
