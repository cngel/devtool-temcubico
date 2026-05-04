const bcrypt = require("bcrypt");
const setDateDB = require("../models/cadastroModel");
module.exports = async function (req, res) {
    const { nome, email, telefone, password } = req.body;
    const password_has = await bcrypt.hash(password, 10);
    console.log(password_has);
    let result = await setDateDB(nome, email, telefone, password_has);
    let resposta = { result };
    res.json({ resposta: resposta });
}    