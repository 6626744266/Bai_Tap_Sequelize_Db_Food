const User = require('../models/user')
const { Sequelize } = require('sequelize')
const { successCode, failCode, errorCode } = require('../ultis/response')

const sequelize = require('../models/index')
const init_models = require('../models/init-models')
const model = init_models(sequelize)


const Op = Sequelize.Op



//GET: Read
const getUser = async (req, res) => {


    // SELECT * FROM user
    let danhSachUser = await model.user.findAll(
        // {
        //     where: {
        //         full_name: {
        //             [Op.like]: '%hql%'
        //         }
        //     }
        // }
    )
    // findOne({ where: { user_id: 2 } })            //findAll({ where: { user_id: 2 } }); // . findByPk(2)

    // res.send(danhSachUser);

    successCode(res, danhSachUser, "lấy dữ liệu thành công")

}



//POST: Create
const postUser = async (req, res) => {
    try {
        let { full_name, email, passWord } = req.body;

        let userNew = {
            full_name,
            email,
            passWord
        };

        let result = await model.user.create(userNew)

        // res.status(200).send(result);
        successCode(res, result, "tạo người dùng thành công")

    } catch (err) {
        // res.status(400).send(err);
        errorCode(res, "lỗi backend")
    }
}



//PUT: update   /id

const updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        let { full_name, email, passWord } = req.body;


        // Kiểm tra dữ liệu
        let checkUser = await User.findByPk(id)
        if (checkUser) {
            //Cập nhật dữ liệu
            let userUpdate = {
                full_name,
                email,
                passWord
            };


            await User.update(userUpdate, { where: { user_id: id } });



            // res.status(200).send("Cập nhật thành công");
            successCode(res, userUpdate, "cập nhật thành công")


        } else {
            // res.status(400).send("user id không tồn tại")
            failCode(res, "", "user id không tồn tại")
        }




    }

    catch (err) {
        res.status(400).send(err);

    }
}

// DELETE: D /id

const removeUser = async (req, res) => {

    try {
        let { id } = req.params


        let checkUser = await model.user.findByPk(id)
        if (checkUser) {

            await User.destroy({
                where:
                {
                    user_id: id
                }
            })


            // res.status(200).send("xoá người dùng thành công");

            successCode(res, "", "xoá người dùng thành công")

        }
        else {
            // res.status(400).send("user id không tồn tại")
            failCode(res, "", "user id không tồn tại")

        }

    }
    catch (err) {



        // res.send(400).send(err)
        errorCode(res, "lỗi backend")
    }





}




//commonjs module
module.exports = { getUser, postUser, updateUser, removeUser }



//CRUD

//R, R:id
