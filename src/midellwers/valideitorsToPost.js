 const { checkSchema } = require("express-validator");
 const houseValidator = checkSchema({
    provincia:{
        in:'body',
        notEmpty:{
            errorMessage:'Digite uma provincia'
        },
        isLength:{ options:{
            max:12,
            min:4
        },errorMessage:'Digite uma provincia valida'
     }
        
    }, 
    preco:{
        notEmpty:{
            errorMessage:'Digite uma preço para a sua residencia'
        },
        toFloat:true,
        isNumeric:{
            errorMessage:'Digite apenas valores númericoa',
            
        },
       
    },
     bairro:{
        notEmpty:{
            errorMessage:'Digite um bairro',
            
        }
     },
     municipio:{
        isEmpty:{
            errorMessage:'Digite o municipio'
        }
     }, 
     tipologia:{
        toInt:true,
        notEmpty:{
            errorMessage:'Digite a tipologia'
        },
        isNumeric:{
            errorMessage:'Digite apenas valores númericos'
        }
     }
 });
 module.exports=houseValidator;
/**
 * municipo
 */