const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service:'gmail',
    secure:false,
    host: "smtp.gmail.com",
    auth:{
        user:process.env.USERMAIL,
        pass:process.env.PASSMAIL
    }
});

module.exports= transporter ;