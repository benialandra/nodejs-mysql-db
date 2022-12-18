const express = require("express");
const { json } = require("express/lib/response");
const mysql = require("mysql");
const BodyParser = require("body-parser");
const app = express();
app.use(BodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.set("views", "views")
const db = mysql.createConnection({
    host: "localhost",
    database: "school",
    user: "root",
    password: "",

});

//get data
db.connect((err) => {
    if (err) throw err
    console.log("db connect")
    app.get("/", (req, res) => {
        const sql = "SELECT  * FROM STUDENT"
        db.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result))
            // console.log("data", users)
            res.render("index", { users: users, title: "Data Siswa" });
        })
    })
});

//insert data
app.post("/tambah", (req, res) => {
    const insertsql = `insert into student (nama,kelas,status) values ('${req.body.nama}','${req.body.kelas}','aktif');`
    db.query(insertsql, (err, result) => {
        if (err) throw err
        res.redirect("/");
    })
});


app.listen(8080, () => {
    console.log("server ready")
});
