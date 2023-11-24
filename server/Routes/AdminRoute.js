import express from 'express'
import con from '../utils/db.js'
const router = express.Router()
import jwt from 'jsonwebtoken'
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

router.post('/add_category', (req,res)=>{
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })

})

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
export { router as adminRouter }