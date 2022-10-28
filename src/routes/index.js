const express = require('express')
const rootRoute = express.Router();


const userRoute = require('./userRoute')
const foodRoute = require('./foodRoute')

rootRoute.use('/user', userRoute);
rootRoute.use('/food', foodRoute)



module.exports = rootRoute;