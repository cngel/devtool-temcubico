const userModel = require("./userModel");
module.exports = async function(id) {
    try{
        const user = await userModel.findByPk(id);
        return user.dataValues;
    }
    catch{
        return new Error("enternal error on server");
    } 
} 