import express, { json } from "express"
import { connect } from "mongoose"
import { authRoutes } from "./routes/auth.js"
import { userRoutes } from "./routes/user.js"
import { schemeRoutes } from "./routes/schemes.js"
import { applicationRoutes } from "./routes/applications.js"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import { cropRoutes } from "./routes/crops.js"
dotenv.config();

const app = express()

app.use(cors({
    origin: ["https://agriculture-schemes.vercel.app", "https://agriculture-schemes-9a11.vercel.app"],
    credentials: true
}));
app.use(cookieParser());
app.use(json({limit: "10mb"}))
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/schemes", schemeRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/crops", cropRoutes)

connect(process.env.MONGODB_URI).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err))

app.get("/", (req, res) => res.send("API is running..."))



const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
