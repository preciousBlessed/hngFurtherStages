const router = require("express").Router();
const controllers = require("../controller/userController");

router
  .get("/", controllers.getAllUsers, controllers.getOne)
  .get("/:user_id", controllers.getOne)
  .post("/", controllers.createUser)
  .put("/:user_id", controllers.updateUser)
  .patch("/:user_id", controllers.updateUser)
  .delete("/:user_id", controllers.deleteOneUser);

module.exports = router;
