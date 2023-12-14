import express from "express";
import cookieParser from "cookie-parser"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/comments", commentRoutes)

app.listen(8800, ()=> {
    console.log("Connected");
})