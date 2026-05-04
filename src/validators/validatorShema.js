const  { validationResult } = require("express-validator");

const validation =(req,res,next)=>{
     const result = validationResult(req);
    if(!result.isEmpty()){
        res.status(500).json({error:result.array()})
    }
    next();
}
module.exports = { validation }