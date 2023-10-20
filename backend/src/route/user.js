const router = require("express").Router();
const middlewareController = require("../app/controller/middlewareController");
const userContoller = require("../app/controller/userController")

router.get("/", middlewareController.verifyToken, userContoller.getAllUser);
router.delete("/:id", middlewareController.verifyTokenAndAdmin, userContoller.deleteUser);

module.exports = router