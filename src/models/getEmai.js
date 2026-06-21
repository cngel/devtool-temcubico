const { PrismaClient } = require("@prisma/client");
const prisma = new  PrismaClient();
const getEmail = async function (email,telefone) {
    try {
        const user = await prisma.users.findFirst({ where: {email: email} });
        return user;
    }
    catch(error) {
        console.log(error);
        return new Error("erro on server");
    }

}
module.exports = getEmail; 
