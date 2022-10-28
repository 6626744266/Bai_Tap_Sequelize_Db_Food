// link qua controller để xử lý 
const express = require('express');
const userRoute = express.Router()
const { getUser, postUser, updateUser, removeUser } = require('../controllers/userController')

//localhost:8080/user/getUser


//GET 
userRoute.get('/getUser', getUser)
//POST 

userRoute.post('/postUser', postUser)


//PUT 
userRoute.put("/putUser/:id", updateUser)
//DELETE

userRoute.delete('/deleteUser/:id', removeUser)


module.exports = userRoute 