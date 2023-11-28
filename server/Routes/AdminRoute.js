import express from 'express'
import bcrypt from 'bcrypt'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/adminlogin', (req, res) => {
   
    const sql = "SELECT * from employees where email =? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {   
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email, id: result[0].id }, "jwt_secret_key", { expiresIn: '1d' })
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        }else{
         return res.json({ loginStatus: false, Error:"wrong email or password" });
        }
    })
})

router.post('/add_department', (req,res)=>{
    console.log('Response:',req.body)
    const sql = "INSERT INTO department (`department`) VALUES (?)"
    con.query(sql, [req.body.department], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })

})

router.get('/department', (req, res) => {
    const sql = "SELECT * FROM department";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})


router.post('/add_employee', (req, res) => {
   console.log('Response:',req.body)
    const sql = `INSERT INTO employee
    (firstName,lastName,userName,password,department_id) 
    VALUES (?)`
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.fname,
            req.body.lname,
            req.body.username,
            hash,
            req.body.department_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

export { router as adminRouter }
