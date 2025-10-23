import express from "express"
import cors from "cors";
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

const app = express()

await connectCloudinary()

app.use(cors())
app.use(express.json())

app.use(clerkMiddleware())

app.get('/', (req, res) => {
    res.send('Server is Live Now')
})

app.use(requireAuth())

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    console.log(`Srevre is running at http://localhost:${PORT}`)
})