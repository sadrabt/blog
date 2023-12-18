import express from "express";
import {getCount, getPosts, getPost, addPost, deletePost, updatePost } from "../controllers/post.js";

const router = express.Router()

router.get("/:limit/:offset", getPosts)
router.get("/count/", getCount)
router.get("/:id", getPost)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)

export default router