const express = require('express');
const cors = require('cors');

const app = express();
//middleware
app.use(express.json())
app.use(express.static("."))
app.use(cors())

app.listen(8080, () => {
})


//localhost:8080/user/getUser
const rootRoute = require('./routes/index')
app.use('/api', rootRoute)


//nodemon : tự động restart lại server khi lưu code
// yarn start or npm start

// method GET: Read
// localhost:8080/hello
// /:title => khai báo API get params từ url
// domain:80?title=nodejs => khai báo từ FE get query dữ liệu từ url

// app.get("/get", (req, res) => {
//     try {

//         console.log(req.body.hoTen)
//         //gửi tất cả dạng dữ liệu trừ number
//         //200
//         res.status(201).send(req.body)
//     } catch (error) {
//         console.log(error)
//         //400
//         res.status(400).send('lỗi rồi em')
//     }
// })


// app.get("/get/:id")
// app.post("/post")
// app.put("/put/:id")
// app.delete("/delete/:id")


// const mysql = require('mysql2');

// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'db_food',
//     port: 3306
// })


// //GET => danh sách food theo id
// app.get('/getFood', async (req, res) => {
//     // let {id} = res.params

//     let sql = "SELECT * FROM food";

//     // conn.query(sql, (err, result) => {
//     //     res.send(result);

//     // });

//     //C2: async await
//     let result = await conn.promise().query(sql)
//     res.send(result[0]);

// })