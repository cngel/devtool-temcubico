const uuid = require("uuid");
const getUserByEmail = require("../../models/getEmai");
const updateUserInfo = require("../../models/updateUserInfo");
const {enviarEmail} = require("../../mail/sendMail");
module.exports = async (req, res) => {
    try{
    const user = await getUserByEmail(req.body.email);
    let { nome , telefone, id, email,token,updateAt, exp } = user;
    token = uuid.v4();
    updateAt ="2025-11-19";
    exp = new Date().getHours();
    
    await updateUserInfo(nome, email, telefone, id, token, exp);
    const url = `http://${req.headers.host}/recuperar/${token}`;
    await enviarEmail(email,token);
    res.json({res:{url:url}});    
    

    }catch(error){
        console.log('error',error);
        res.status(500);
        res.json({error:error});
    }
    

}