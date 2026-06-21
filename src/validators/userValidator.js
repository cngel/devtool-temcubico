const { checkSchema } = require("express-validator");

const userValidator = checkSchema({
     nome:{
        notEmpty:{
            errorMessage:"Prencha o campo do nome"
        },
        isString:{
            errorMessage:'Nome invalido'
        }
     }, email:{
        isEmail:{
            errorMessage:"Digite um email valido",
            
        },
        notEmpty:{
            errorMessage:"Digite um valor no campo de email"
        }
     }, telefone:{
        notEmpty:{
            errorMessage  :'Digit um numro de tlefone'
        },
        isNumeric:{
            errorMessage:'Telefone invalido'
        },
        isLength:{
            options:{ max:9, min:9 },
            errorMessage:'Digite um telefone valido'
        }
     }, password:{
        notEmpty:{
            errorMessage:"Digite uma senha"
        },
        isLength:{
            options:{ max:9, min:9 },
            errorMessage:'Digite uma senha segura'
        },
        isString:{
            errorMessage:'Password indalida'
        }
     } 
});

module.exports= { userValidator  } 