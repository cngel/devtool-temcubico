const userModel = require("./userModel");
const getEmail = async function (email,telefone) {
    try {
        const user = await userModel.findOne({ where: {email: email} });
        return user;
    }
    catch(error) {
        console.log(error);
        return new Error("erro on server");
    }

}
module.exports = getEmail; 
