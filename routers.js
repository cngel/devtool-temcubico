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
router.get("/getAll", hausesController.getAlls); //done
router.get("/getOne/:id", hausesController.getOnes); //done
router.get("/getHouse", hausesController.getHouse); //done

router.post("/postNewHouse",
     loginMidellwere, houseValidator,
     validation,
      hausesController.postNewHouse
); //done
router.get("/mypostes", 
    loginMidellwere,
     hausesController.myHoses
);
//criar rotas para editar os posts
/**end of @houses */

/**router to controller @users */
router.post("/user/login", loginController); //done

router.post("/user/cadastro",
    userValidator,
    validation,
    cadastroController
); //done
router.get("/user/profile/me",
     loginMidellwere, 
     userControler.getUserInfo
); //done
 
router.post("/user/updateUserInfo", 
     loginMidellwere,
     userControler.updateUserInfo
); //done

router.get("/user/getUserInfo/:id", 
    loginMidellwere, 
    userControler.anotherUserInfo
); //done

router.post("/user/forgetPassord", forgetPassord);
//enviar o token e a nova password;
router.post("/user/recuperar",recuperar);
/**end user @userRouter */



module.exports = router;