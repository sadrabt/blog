import { database } from "../database.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res)=> {
    const q = "SELECT P.* FROM blog.posts P ORDER BY P.date DESC LIMIT ? OFFSET ?";
    console.log(req.params.offset)
    database.query(q, [parseInt(req.params.limit), parseInt(req.params.offset)], (err, data) => {
        console.log(err)
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const getCount = (req, res) => {
    const q = "SELECT COUNT(*) FROM posts";
    database.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}


export const getPost = (req, res)=> {
    const q = "SELECT P.*, `username` FROM posts P JOIN users U ON P.uid = U.id WHERE P.id = ?";
    database.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const addPost = (req, res)=> {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token")
        const q = "INSERT INTO posts(`title`, `desc`, `content`, `date`,`uid`) VALUES (?)";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.content,
            req.body.date,
            userInfo.id,
        ]
  
        database.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post was created");
        })
    })
}

export const deletePost = (req, res)=> {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token")

        const blogId = req.params.id;
        const q = "DELETE FROM posts WHERE id = ? and uid = ?"
        database.query(q, [blogId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json("Post deleted")
        })
    })
}

export const updatePost = (req, res)=> {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token")
        const q = "UPDATE posts SET `title` = ? , `desc` = ?, `content` = ?, `edit` = ? WHERE `id` = ? AND `uid` = ?";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.content,
            req.body.edit,
        ]
  
        database.query(q, [...values, req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post was updated");
        })
    })
}