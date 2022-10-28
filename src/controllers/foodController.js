const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const rate_res = require('../models/rate_res');
const { errorCode, successCode, failCode } = require('../ultis/response');
const model = init_models(sequelize)




const getLikeListRes = async (req, res) => {
    let { id } = req.params
    let data = await model.restaurant.findAll({ where: { res_id: id }, include: ["user_id_users"] })


    res.send(data)
}


const getLikeListUser = async (req, res) => {
    let { id } = req.params
    let data = await model.user.findAll({ where: { user_id: id }, include: ["res_id_restaurants"] })
    res.send(data)

}

const likeRes = async (req, res) => {
    try {
        let { user_id,
            res_id
        } = req.body

        let date_like = Date.now()
        const resName = await model.restaurant.findAll({ attributes: ["res_name"], where: { res_id } })


        let checkUser = await model.user.findByPk(user_id)
        let checkRes = await model.restaurant.findByPk(res_id)


        if (!checkUser) {
            failCode(res, "", "User không tồn tại  ")
            return
        }

        if (!checkRes) {
            failCode(res, "", "Nhà hàng không tồn tại")
            return
        }

        let checkDup = await model.like_res.findOne({ where: { user_id, res_id } })
        if (checkDup) {
            await model.like_res.destroy({ where: { user_id, res_id } })
            errorCode(res, `Đã hủy like nhà hàng ${resName[0].dataValues.res_name} thành công`)


        }
        else {

            let likeNew = {
                user_id, res_id, date_like
            }

            let result = await model.like_res.create(likeNew)


            successCode(res, "", `Đã like nhà hàng ${resName[0].dataValues.res_name} thành công`)


        }



    }

    catch (error) {





        errorCode(res, "Lỗi backend   ")

    }




}



const rateRes = async (req, res) => {
    try {
        let { user_id,
            res_id,
            amount
        } = req.body

        let date_rate = Date.now()

        let checkUser = await model.user.findByPk(user_id)
        let checkRes = await model.restaurant.findByPk(res_id)


        if (!checkUser) {
            failCode(res, "", "User không tồn tại  ")
            return
        }

        if (!checkRes) {
            failCode(res, "", "Nhà hàng không tồn tại")
            return
        }

        if (amount > 5) {
            failCode(res, "", "Số sao đánh giá phải từ 1 đến 5")
            return
        }

        let checkDup = await model.rate_res.findOne({ where: { user_id, res_id } })
        if (checkDup) {
            await model.rate_res.update({ amount, date_rate }, { where: { user_id, res_id } })
            successCode(res, "", "Đã cập nhật đánh giá thành công")
        }
        else {


            let rateNew = {
                user_id, res_id, amount, date_rate
            }

            let result = await model.rate_res.create(rateNew)

            const resName = await model.restaurant.findAll({ attributes: ["res_name"], where: { res_id } })


            successCode(res, "", `Đã đánh giá nhà hàng ${resName[0].dataValues.res_name} thành công`)


        }



    }

    catch (error) {

        errorCode(res, "Lỗi backend")
    }



}

const getRateListRes = async (req, res) => {
    let { id } = req.params

    let data = await model.restaurant.findOne({ where: { res_id: id }, include: ["user_id_user_rate_res"] })
    res.send(data)

}

const getRateListUser = async (req, res) => {
    let { id } = req.params

    let data = await model.user.findOne({ where: { user_id: id }, include: ["res_id_restaurant_rate_res"] })
    res.send(data)

}


const order = async (req, res) => {
    try {
        let { user_id,
            food_id,
            amount,
            arr_sub_id
        } = req.body
        if (arr_sub_id === undefined) {
            arr_sub_id = ""
        }


        let checkUser = await model.user.findByPk(user_id)
        let checkFood = await model.food.findByPk(food_id)


        if (!checkUser) {
            failCode(res, "", "User không tồn tại  ")
            return
        }

        if (!checkFood) {
            failCode(res, "", "Thức ăn không tồn tại")
            return
        }

        let checkDup = await model.order.findOne({ where: { user_id, food_id } })

        if (checkDup) {
            let orderUpdate = {
                amount,
                code: "",
                arr_sub_id
            }
            await model.order.update(orderUpdate, { where: { user_id, food_id } })

            successCode(res, "", "Đã cập nhật đơn hàng thành công")

        }
        else {
            let orderNew = {
                user_id,
                food_id,
                amount,
                code: "",
                arr_sub_id

            }
            let result = await model.order.create(orderNew)



            successCode(res, result, `Đã tạo order mới thành công`)
        }


    }

    catch (error) {
        errorCode(res, "lỗi backend")
    }
}

module.exports = { getLikeListRes, getLikeListUser, likeRes, rateRes, getRateListRes, getRateListUser, order }