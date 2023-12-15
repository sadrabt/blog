import { database } from "../database.js"; 
import jwt from "jsonwebtoken";

export const getCommentsNum = (req, res)=> {
    const q = "SELECT COUNT(C.pid) AS comments FROM posts P LEFT JOIN comments C ON P.id = C.pid WHERE P.id = ? GROUP BY P.id";
    database.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const getReplies = (req, res)=> {
    const q = "SELECT C.*, `username` FROM comments C JOIN users U ON C.uid = U.id WHERE C.pid = ? "
    database.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}


export const deleteReply = (req, res)=> {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token")
        const commentId = req.params.id;
        const q = "DELETE FROM `blog`.`comments` WHERE (`id` = ? AND `uid`=?);"
        database.query(q, [commentId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Comment Deleted")
        })
    })
}


export const addReply = (req, res)=> {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token")
        const q = "INSERT INTO comments(`content`, `pid`, `time`,`uid`, `parent`) VALUES (?)"
        // const parent = req.body.parent === null : "NULL"
        const values = [
            req.body.content,
            req.body.blog,
            req.body.date,
            userInfo.id,
            req.body.parent
        ]
        console.log(values)
        database.query(q, [values], (err, data) => {
            console.log(err)
            console.log(data)
            if (err) return res.status(500).json(err)
            return res.status(200).json("Comment Added")
        })
    })
}
