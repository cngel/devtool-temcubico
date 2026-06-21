const verifyToken = require("../../models/verifyToken");
const bcrypt = require("bcrypt");
const USER = require("../../models/userModel");

module.exports = async (req, res) => {
       try {
              const { token } = req.body;
              const { password } = req.body;
              const has = await bcrypt.hash(password, 10);
              await USER.update({
                     password_has: has
              }, { 
                     where: { token: token }
              })
              res.json({ msg: "senha alterada com sucesso", senha: has });

       } catch (error) {

              const exp = await verifyToken.vrifyToken(token);
              const timetoExp = new Date().getHours();
             
              res.status(500).json({ error: "internal error" });

       }

}