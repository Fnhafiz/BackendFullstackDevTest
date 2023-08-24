import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import LoginRegisterRoutes from "./routes/LoginRegisterRoutes.js";

// Create a new express application instance
const app = express();
const port = 3001;

// parse application
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", LoginRegisterRoutes);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
