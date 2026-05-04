const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getEmail = require("../models/getEmai");
const SECRET = process.env.KEY;  

module.exports = async function (req, res) {
    const { email, password } = req.body;
    const dataUser = await getEmail(email);
    const user = dataUser;

    if (!user) {
        return res.status(401).json({ error: "Email e/ou senha incorretos" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password_has);
    if (!passwordIsValid) {
        return res.status(401).json({ error: "Email e/ou senha incorretos" });
    }
    
     const token = jwt.sign(
        {   
            id:user.id,
            nome:user.nome,
            email:user.email,
            telefone:user.telefone
        },
        SECRET,
        {expiresIn:'24h'}
    );

    // Retorna o token para o cliente
    res.json({ 
        message: "Login bem-sucedido", 
        token:token 
    });
};