const { STRING, NUMBER } = require("sequelize");
const sequelize = require("./conn");
const User = sequelize.define('users',
    {
        id:{
            type:NUMBER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false 
        },
        nome: {
            type: STRING,
            allowNull: false,
        },
        email: {
            type:STRING,
            allowNull: false,
            unique:true
        },
        telefone:{
            type: Number,
            allowNull:false,
            unique:true
        },
        token:{
            type:STRING,
            allowNull:true
        },
        exp:{
            type:{
                STRING
            }
             
        },
        password_has:{
            type:STRING,
            allowNull:false
        }
    }
)
module.exports=User;
 