import express from "express"
import {addReply, deleteReply, getCommentsNum, getReplies} from "../controllers/comments.js"

const router = express.Router()

router.get("/:id", getCommentsNum)
router.get("/replies/:id", getReplies)
router.post("/", addReply)
router.delete("/replies/:id", deleteReply)

export default router