const {PrismaClient} = require("@prisma/client");
const { users } = new PrismaClient()
const setDateDB = async function (nome, email, telefone, password_has) {
    try {

        await users.create({
            data:{
                nome,
                telefone:Number(telefone),
                email,
                password_has,
                createdAt:new Date(),
                token:""
            }
        });

        return "Usuario Criado com sucesso";

    } catch(error) {

        console.log(error);

        // erro de campo unique (email ou telefone repetido)
        if(error.code === "P2002"){

            const campo = error.meta.target;

            return {
                error:true,
                message:`Email invalido e/ ou numero de telefone!`
            };
        }


        return {
            error:true,
            message:"Erro interno no servidor"
        };
    }
}
module.exports = setDateDB;