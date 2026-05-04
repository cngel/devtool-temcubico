
const { getAll, getHouses, postNewHouses, myPosts } = require("../models/querys");
const { getOne } = require("../models/querys");
const uuid = require("uuid");

module.exports = {
    getAlls: async (req, res) => {
        let resultado = "";
        try {
            resultado = await getAll();
            res.json({ res: resultado });
        } catch (error) {
            resultado = new Error("internal error");
            res.json({ error: resultado });
        }
    },
    getOnes: async (req, res) => {
        let resultado = "";
        try {
            const id = req.params.id;
            resultado = await getOne(id);
            res.json({ res: resultado });
        } catch (error) {
            resultado = new Error("internal error");
            res.json({ error: resultado }).status(501);
        }
    },
    getHouse: async (req, res) => {
        try {
            const { provincia, municipio, bairro, tipologia, preco } = req.query;
            console.log(req.query)
            let resposta = { result: "", error: '' }
            let resultado = await getHouses(provincia, municipio, bairro, tipologia, preco);
            resposta.result = resultado;
            res.json(resposta);
        } catch (error) {
            console.log(error);
            res.json({ error: "internal error" }).status(501);
        }



    },
    /* I finish i need only meke some testes */
    postNewHouse: async (req, res) => {
        const id = req.user.id //descomtar isso;
        const { provincia, preco, bairro, municipio, state, tipologia } = req.body;
        let resposta = { result: "", error: '' }
        if (!req.files) {
            res.json({ "error": "prescisa de image " });
            return;
        }
        const { image } = req.files;
        const alawed = ['image/jpeg', 'image/png', 'image/jpg'];
        let sizeFile = (image.size) / 1048576 //Peso em MB da imagem
        if (alawed.includes(image.mimetype) && sizeFile < 100) {
            let imagem = uuid.v4();
            imagem = imagem.concat(image.name);
            await image.mv(`./src/public/image/${imagem}`, (err) => {
                if (err) {
                    console.log("error" + err);
                    resposta.error = err;
                    return;
                }
            })
            /* Postagens das casas no banco de dados*/
            try{
            let resultado = await postNewHouses(id, provincia, preco, bairro, municipio, imagem, state, tipologia);
            res.json({result:"Casa postada com sucesso"});
            }catch(error){
                console.log(error);
                res.json({error:"internal error"}).status(501);
            }
            return;
        } else {
            resposta.error = "arquivo não suportado";
            res.status(500);

        }
        res.json(resposta);


    },//por termina a rota de edit action
    myHoses: async function (req, res) {
        try {
            const dados = req.body;
            const id = req.params.id;
            const idUs = req.user.id;
            const result = myPosts(id, idUs);
            res.json({ res: result });


        } catch (error) {
            console.log({ error: error });
            res.json({ error: 'internal errror' }).status(501);
        }
    }
};