import { database } from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = (req, res)=> {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    database.query(q, [req.body.email, req.body.username], (err, data)=> {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already exists!")

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        database.query(q, [values], (err, data) => {
            if (err) return res.stauts(500).json(err);
            return res.status(200).json("User has been created.");
        })
    })
}

export const login = (req, res)=> {
    const q = "SELECT * FROM users WHERE username = ?"
    database.query(q, [req.body.username], (err, data)=> {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("User not found!")
        const correctPass = bcrypt.compareSync(req.body.password, data[0].password)
        if(!correctPass) return res.status(400).json("Incorrect Password!")
        // TODO change they can know what is not your password 

        const tkn = jwt.sign({id: data[0].id}, "jwtkey")
        const {password, ...rest} = data[0]

        res.cookie("access_token", tkn, {
            httpOnly:true
        }).status(200).json(rest)
    })
}

export const logout = (req, res)=> {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User logged out")
}