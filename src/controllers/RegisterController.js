import prisma from "../services/prisma.js";
import * as bcrypt from "bcrypt";

class RegisterController {
	register = async (req, res) => {
		try {
			const { name, email, password } = req.body;

			// check if email already exist
			const checkEmail = await prisma.prisma.users.findUnique({
				where: {
					email: email,
				},
			});

			// if email already exist
			if (checkEmail) {
				return res.status(400).json({
					isError: true,
					message: "Email already exist",
					data: null,
				});
			}

			// hashpassword
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);

			// create new user on database
			const newUser = await prisma.prisma.users.create({
				data: {
					name: name,
					email: email,
					password: hashPassword,
				},
			});
			res.json({
				isError: false,
				message: "Register success",
				data: newUser,
			});
		} catch (error) {
			res.status(500).json({
				isError: true,
				message: "Register failed, Please try again!",
				data: error,
			});
		}
	};
}

export default new RegisterController();
