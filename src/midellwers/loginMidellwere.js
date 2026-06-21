const jwt = require("jsonwebtoken");
const SECRET = process.env.KEY;

module.exports = function (req, res, next) {
    const token = req.headers.authorization; 
    if (!token) {
        return res.status(403).json({ error: "Token não fornecido" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }

        
        req.user = decoded;
        next();
    });
};
