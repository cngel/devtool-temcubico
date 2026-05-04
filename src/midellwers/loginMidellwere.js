const jwt = require("jsonwebtoken");
const SECRET = process.env.KEY;

module.exports = function (req, res, next) {
    const token = req.headers.authorization; 
    console.log("console;",{token:token});
    if (!token) {
        return res.status(403).json({ error: "Token não fornecido" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }

        // Anexa os dados do usuário na requisição
        req.user = decoded;
        next();
    });
};
