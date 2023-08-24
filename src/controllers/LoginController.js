import prisma from "../services/prisma.js";
import * as bcrypt from "bcrypt";

class LoginController {
	login = async (req, res) => {
		try {
			const { email, password } = req.body;

			// check if email already exist
			const checkEmail = await prisma.prisma.users.findUnique({
				select: {
					name: true,
					password: true,
				},
				where: {
					email: email,
				},
			});

			// if email not exist
			if (!checkEmail) {
				return res.status(400).json({
					isError: true,
					message: "Email not registered",
					data: null,
				});
			}

			// check password
			const validPassword = await bcrypt.compare(
				password,
				checkEmail.password
			);

			// if password not match
			if (!validPassword) {
				return res.status(400).json({
					isError: true,
					message: "Invalid password",
					data: null,
				});
			}

			// if success
			return res.json({
				isError: false,
				message: "Login success",
				data: {
					name: checkEmail.name,
				},
			});
		} catch (error) {
			res.status(500).json({
				isError: true,
				message: "Login failed, Please try again!",
				data: error,
			});
		}
	};
}

export default new LoginController();
