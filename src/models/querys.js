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
    /*i need make upgrade in search missed add price more ou iqual */
    getHouses: async (provincia, municipio, bairro, tipologia, preco) => {
        try {
            let filtro = {};
            if (tipologia) {
                filtro.tipologia = Number(tipologia);
            }
            if (preco) {
                filtro.preco = Number(preco);
            }
            if (provincia || municipio || bairro) {
                filtro.localizaco = {
                    ...(provincia && {
                        provincia
                    }),

                    ...(municipio && {
                        municipio
                    }),

                    ...(bairro && {
                        bairro
                    })
                };
            }
            return await prisma.casas.findMany({
                where: filtro,
                include: {
                    localizaco: true,
                    imagens_casas: true
                }
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    /* Routers for post new house all inputs is nesseciry */
    postNewHouses: async (
        idUser,
        provincia,
        preco,
        bairro,
        municipio,
        image,
        state,
        tipologia
    ) => {

        try {
            // criar localização
            const localizacao = await prisma.localizaco.create({
                data: {
                    provincia,
                    municipio,
                    bairro
                }
            });
            // criar imagens
            const imagens = await prisma.imagens_casas.create({
                data: {
                    image1: image.image1,
                    image2: image.image2 || null,
                    image3: image.image3 || null
                }

            });
            // criar casa
            const casa = await prisma.casas.create({
                data: {
                    idUser: Number(idUser),
                    preco: Number(preco),
                    state,
                    tipologia: Number(tipologia),
                    localizacao: localizacao.id,
                    images: imagens.id,
                    createdAt: new Date()
                }

            });
            console.log("POST DONE SUSSEFULY");
            return casa;
        } catch (error) {
            console.log("ERRO POST HOUSE:", error);
            throw error;
        }
    },
    myPosts: async function (idUsuario) {
          try{
            return prisma.casas.findMany({
                where:{
                    idUser:Number(idUsuario)
                }
            })
          }catch(error){   
                console.log("error:"+error); 
                throw error
          }
    }

}
