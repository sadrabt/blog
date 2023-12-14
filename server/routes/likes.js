import express from "express"
import { getLikes, like} from "../controllers/likes.js";

const router = express.Router()

router.get("/:id/:user", getLikes)
router.post("/", like)


export default router