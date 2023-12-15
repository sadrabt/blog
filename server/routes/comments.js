import express from "express"
import {deleteReply, getCommentsNum, getReplies} from "../controllers/comments.js"

const router = express.Router()

router.get("/:id", getCommentsNum)
router.get("/replies/:id", getReplies)
router.delete("/replies/:id", deleteReply)

export default router