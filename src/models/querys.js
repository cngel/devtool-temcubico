const HOUSES = require("./hauseModel");
const connect = require("./conn");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
module.exports = {
    /* Query to get all houses */
    getAll: async () => {
        try {
            const houses = await prisma.casas.findMany();
            return houses;
        } catch (error) {
            console.log(error);
            return new Error("internal error");
        }
    },
    /* Query to get one house for idHouse */
    getOne: async (id) => {
        try {
            id = Number(id);
            const house = await prisma.casas.findUnique({ where: { id: id } });
            return house;
        } catch (error) {
            console.log(error);
            return new Error("internal error");
        }

    },
    /*i need make upgrade in search */
    getHouses: async (provincia, municipio, bairro, tipologia, preco) => {
        try {
            const result = await HOUSES.findAll({
                where: {
                    provincia: provincia,
                    municipio: municipio,
                    bairro: bairro,
                    preco: preco,
                    tipologia: tipologia
                }
            })
            return result;
        }
        catch (error) {
            console.error({ error: error }); 1
            return new Error("internal error");
        }
    },
    /* Routers for post new house all inputs is nesseciry */
    postNewHouses: async (idUser, provincia, preco, bairro, municipio, image, state, tipologia) => {
        try {
            await HOUSES.create({
                idUser: idUser,
                provincia: provincia,
                preco: preco,
                image: image,
                tipologia: tipologia,
                bairro: bairro,
                municipio: municipio,
                state: state,
                createdAt: Date.now()
            });
            console.log("evoriting ok");
            return "Post com sucesso";
        } catch (error) {
            console.log(error);
            return new Error("error ao postar house");

        }

    },
    myPosts: async function (id, idUsuario) {
        try {
            return await HOUSES.findAll({
                where: {
                    id: id,
                    idUser: idUsuario
                }
            })
        } catch (error) {
            console.log(error);
            return new Error("errror on server");
        }
    }


}
