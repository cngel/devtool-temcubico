const { Router } = require("express");
const router = Router();
const hausesController = require("./src/controllers/hauseController");
const houseValidator = require("./src/midellwers/valideitorsToPost");
const cadastroController = require("./src/controllers/cadastroController");
const loginController = require("./src/controllers/login");
const userControler = require("./src/controllers/usercontroller");
const loginMidellwere = require("./src/midellwers/loginMidellwere");
const forgetPassord = require("./src/controllers/user/forgetPassord");
const recuperar =require("./src/controllers/user/recuperarPassword");
const {userValidator } = require("./src/validators/userValidator");
const {validation} = require("./src/validators/validatorShema");
/* main router */
router.get("/", (req, res) => {
     
    res.sendFile(__dirname + "/htmls/index.html");
});

/**routers to get @houses */
router.get("/getAll", hausesController.getAlls);
router.get("/getOne/:id", hausesController.getOnes);
router.get("/getHouse", hausesController.getHouse);
router.post("/postNewHouse", loginMidellwere, houseValidator,validation, hausesController.postNewHouse);
router.get("/mypostes/:id", loginMidellwere, houseValidator,validation, hausesController.myHoses);
//criar rotas para editar os posts
/**end of @houses */

/**router to controller @users */
router.post("/user/login", loginController);
router.post("/user/cadastro",
    userValidator,
    validation,
    cadastroController
);
router.get("/user/profile/me", loginMidellwere, userControler.getUserInfo);
router.post("/user/updateUserInfo", loginMidellwere, userControler.updateUserInfo);
router.get("/user/getUserInfo/:idUser", loginMidellwere, userControler.getUserInfo);
router.post("/user/forgetPassord", forgetPassord);
//enviar o token e a nova password;
router.post("/user/recuperar",recuperar);
/**end user @userRouter */



module.exports = router;