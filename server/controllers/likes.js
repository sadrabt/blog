import { database } from "../database.js"; 

export const getLikes = (req, res)=> {
    const q = "SELECT EXISTS(SELECT * FROM likes L2 WHERE L2.pid = ? AND L2.uid = ?) AS liked, COUNT(L.pid) AS likes FROM posts P LEFT JOIN likes L ON P.id = L.pid WHERE P.id = ? GROUP BY P.id";
    database.query(q, [req.params.id, req.params.user, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const like = (req, res)=> {

    const q = "SELECT * FROM likes L WHERE L.uid = ? AND L.pid = ?"
    database.query(q, [req.body.user, req.body.id], (err, data) => {
        
        if (err) return res.status(500).json(err)
        if (data.length) {
            const q = "DELETE FROM `blog`.`likes` WHERE (`pid` = ?) and (`uid` = ?);"
            database.query(q, [req.body.id, req.body.user], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("Unliked Successfully")
            })
        } else {
            const q = "INSERT INTO `blog`.`likes` (`pid`, `uid`) VALUES ('?', '?');"
            database.query(q, [req.body.id, req.body.user], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("Liked Successfully")
            })
        }
    })
}

export const getCommentLikes = (req, res)=> {
    const q = "SELECT EXISTS(SELECT * FROM comment_likes L2 WHERE L2.cid = ? AND L2.uid = ?) AS liked, COUNT(L.cid) AS likes FROM comments C LEFT JOIN comment_likes L ON C.id = L.cid WHERE C.id = ? GROUP BY C.id";
    database.query(q, [req.params.id, req.params.user, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const commentLike = (req, res)=> {
    const q = "SELECT * FROM comment_likes L WHERE L.uid = ? AND L.cid = ?"
    database.query(q, [req.body.user, req.body.id], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) {
            const q = "DELETE FROM `blog`.`comment_likes` WHERE (`cid` = ?) and (`uid` = ?);"
            database.query(q, [req.body.id, req.body.user], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("Unliked Successfully")
            })
        } else {
            const q = "INSERT INTO `blog`.`comment_likes` (`cid`, `uid`) VALUES ('?', '?');"
            database.query(q, [req.body.id, req.body.user], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("Liked Successfully")
            })
        }
    })
}