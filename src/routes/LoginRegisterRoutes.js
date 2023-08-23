import { Router } from "express";
import RegisterController from "../controllers/RegisterController.js";
import LoginController from "../controllers/LoginController.js";

class LoginRegisterRoutes {
	constructor() {
		this.router = Router();
		this.router.post("/register", RegisterController.register);
		this.router.post("/login", LoginController.login);
	}
}

export default new LoginRegisterRoutes().router;
