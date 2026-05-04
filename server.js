require("dotenv").config();
const http = require("http");
const express = require("express");
const express_fileupload = require("express-fileupload");
const cors = require("cors");
const app = express();
const router = require("./routers.js");

/*configurando o cors*/
const corsOpiniens={
    origin:'*',
    methods:['GET,PUT,POST,DELETE']
}
/*Midellwers*/ 
 app.use(express.static(__dirname+"/src/public"));
 app.use(cors(corsOpiniens));
 app.use(express_fileupload());
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 app.use("/api",router);
 app.use(function(req,res,next){

    res.status(404);
    res.json({notFoud:true});
    return;
 }) 
/*fim do midellwers*/
 

const server = http.createServer(app);
server.listen(5000,()=>{
    console.log(`-Rodando on: http://${process.env.HOST}:${process.env.PORT}`);
});