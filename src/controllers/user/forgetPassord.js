const uuid = require("uuid");
const getUserByEmail = require("../../models/getEmai");
const updateUserInfo = require("../../models/updateUserInfo");
const {enviarEmail} = require("../../mail/sendMail");
module.exports = async (req, res) => {
    try{
    const user = await getUserByEmail(req.body.email);
    const token = uuid.v4(); //o token precisa expirar
    //await updateUserInfo(nome, email, telefone, id, token, exp);
    if(user){
        //await enviarEmail({email}:user,token);
        const url = `http://${req.headers.host}/recuperar/${token}`;
        res.json({res:{url:url}});    
    
    }
    res.json({response:'email inválido'});
    
    

    }catch(error){
        console.log('error',error);
        res.status(500);
        res.json({error:error});
        throw error;
    }
    

}