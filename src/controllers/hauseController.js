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
            res.json({ response: resultado });
        } catch (error) {
            resultado = new Error("internal error");
            res.json({ error: resultado }).status(501);
            throw error;
        }
    },
    getHouse: async (req, res) => {
        try {
            const { provincia, municipio, bairro, tipologia, preco } = req.query;
            console.log(req.query)
            let response = { result: "", error: '' }
            let resultado = await getHouses(provincia, municipio, bairro, tipologia, preco);
            response.result = resultado;
            res.json(response);
        } catch (error) {
            console.log(error);
            res.json({ error: "internal error" }).status(501);
        }



    },
    /* I finish i need only meke some testes */
    postNewHouse: async (req, res) => {
        try {
            const id = req.user.id;
            const {
                provincia,
                preco,
                bairro,
                municipio,
                state,
                tipologia
            } = req.body;
            if (!req.files || !req.files.image) {

                return response.status(400).json({
                    error: "A imagem principal é obrigatória"
                });

            }
            let images = req.files.image;
            // transformar em array caso venha apenas uma imagem
            if (!Array.isArray(images)) {
                images = [images];
            }
            // máximo permitido pelo schema
            if (images.length > 3) {

                return res.status(400).json({
                    error: "Máximo de 3 imagens permitido"
                });

            }
            const allowed = [
                "image/jpeg",
                "image/png",
                "image/jpg"
            ];
            let imageNames = [];
            // validar todas imagens
            for (const img of images) {
                if (!allowed.includes(img.mimetype)) {

                    return res.status(400).json({
                        error: "Formato de imagem inválido"
                    });

                }
                const size = img.size / 1048576;
                if (size > 100) {
                    return res.status(400).json({
                        error: "Imagem maior que 100MB"
                    });

                }
            }
            // upload das imagens
            for (const img of images) {
                const name = uuid.v4() + img.name;
                const path = `./src/public/image/${name}`;
                await img.mv(path);
                imageNames.push(name);

            }
            try {
                const resultado = await postNewHouses(
                    id,
                    provincia,
                    preco,
                    bairro,
                    municipio,
                    {
                        image1: imageNames[0],
                        image2: imageNames[1] || null,
                        image3: imageNames[2] || null
                    },
                    state,
                    tipologia

                );
                return res.status(201).json({
                    response: {
                        message: "Casa criada com sucesso",
                        imagens: imageNames.length,
                        house: resultado
                    }

                });
            } catch (error) {
                console.log(error);
                // se banco falhar remove imagens enviadas
                imageNames.forEach(img => {
                    const file = `./src/public/image/${img}`;
                    if (fs.existsSync(file)) {
                        fs.unlinkSync(file);
                    }

                });
                return res.status(500).json({
                    error: "Erro ao guardar casa no banco"

                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: "Erro interno no servidor"

            });

        }

    },//por termina a rota de edit action
    myHoses: async function (req, res) {
        try {
            const idUs = req.user.id;
            const result = await myPosts(idUs);
            res.json({ response: result });


        } catch (error) {
            console.log({ error: error });
            res.json({ error: 'internal errror' }).status(501);
        }
    }
};