const express = require('express');
const foodRoute = express.Router()

const { getLikeListRes, getLikeListUser, likeRes, rateRes, getRateListRes, getRateListUser,order } = require('../controllers/foodController')

const food = require('../models/food');




//Lây danh sách like theo nhà hàng
foodRoute.get('/layDanhSachLikeTheoNhaHang/:id', getLikeListRes)

//Lấy danh sách like theo user
foodRoute.get('/layDanhSachLikeTheoUser/:id', getLikeListUser)

//Like nhà hàng
foodRoute.post("/likeNhaHang", likeRes)

//Đánh giá nhà hàng
foodRoute.post('/rateNhaHang', rateRes)


//Lấy danh sách đánh giá theo nhà hàng
foodRoute.get('/layDanhSachDanhGiaTheoNhaHang/:id', getRateListRes)
//Lấy danh sách đánh giá theo user
foodRoute.get('/layDanhSachDanhGiaTheoUser/:id', getRateListUser)

//Order
foodRoute.post('/order',order)



module.exports = foodRoute;

