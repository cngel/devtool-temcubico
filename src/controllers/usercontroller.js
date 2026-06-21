const getUserById = require("../models/getUserById");
const updateUserInfo = require("../models/updateUserInfo");
const sequelize = require("../models/conn");
const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const prisma = new PrismaClient();
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
    },
    anotherUserInfo:async (req,res) => {
        const id = Number(req.params.id);
         try {
            //limitar os dados enviados na resposta
            const responta = await prisma.users.findUnique(
                {
                    where:{
                        id
                    },
                 
                }
            )
            res.json({response:responta})
         } catch (error) {
            res.status(500)
            .json({error:'internal error'});
            throw error;
         }
    }

}