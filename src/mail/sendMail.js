
const transporter = require("./trasport");
const enviarEmail =  async  (to,token) => {
  const info = await transporter.sendMail({
    from: '"DevtoolSistemas" <DevtoolSistemas@.email>',
    to: to,
    subject: "Recuperacao de senha.",
    text: token, // token de verificaçao.
    html: '<b>clique aqui <a href="http://youtobe.com" target="_blank" rel="noopener noreferrer">Chelsia</a> </b>', // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};
//com log do curso 
module.exports= {enviarEmail};