const userModel = require("./userModel");
const setDateDB = async function (nome, email, telefone, password_has) {
    try {
        const date =  Date.now();
        await userModel.create({
            nome:nome,
            telefone:telefone,
            email:email,
            password_has: password_has,
            createAt: date
        });
        console.log("tudo ok");
        return "Usuario Criado com sucesso";
    } catch(error) {
        console.log(error);
        return new Error("internal error on server");
    }

}
module.exports = setDateDB;