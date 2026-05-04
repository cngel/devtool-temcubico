const USER = require("./userModel");
 module.exports={
    vrifyToken:async(token)=>{
      const {exp} = await USER.findOne({where:{ token : token }});
      console.log(exp);
         return exp
      }
 }