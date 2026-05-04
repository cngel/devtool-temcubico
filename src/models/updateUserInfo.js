const USER = require("./userModel");
module.exports = async function (nome, email, telefone, idUser, token, date) {
    try {
        await USER.update({
            nome: nome,
            email: email,
            telefone: telefone,
            token: token,
            exp:date

        },
            { where: { id: idUser } }
        );

        return "Dados alterados co sucesso";
    } catch (error) {
        console.log(error);
        return new Error(error);
    }

}
//arranjar este arquivo 