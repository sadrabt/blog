import { database } from "../database.js"; 

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
