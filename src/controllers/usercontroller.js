const getUserById = require("../models/getUserById");
const updateUserInfo = require("../models/updateUserInfo");
const sequelize = require("../models/conn");
module.exports =
{
    getUserInfo: async function (req, res) {

          let userInfo = req.user;
          
          res.json({ resposta: userInfo });
         
    },
    updateUserInfo: async (req, res) => {
        let { nome, email, telefone } = req.body;
        let { id } = req.user;
        let resposta = await updateUserInfo(nome, email, telefone, id);
        res.json(resposta);
    }

}