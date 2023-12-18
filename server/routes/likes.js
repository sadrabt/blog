import express from "express"
import { commentLike, getCommentLikes, getLikes, like} from "../controllers/likes.js";

const router = express.Router()

router.get("/:id/:user", getLikes)
router.post("/", like)
router.get("/comments/:id/:user", getCommentLikes)
router.post("/comments/", commentLike)


export default router