import express from "express"
import {getCommentsNum, getReplies} from "../controllers/comments.js"

const router = express.Router()

router.get("/:id", getCommentsNum)
router.get("/replies/:id", getReplies)

export default router