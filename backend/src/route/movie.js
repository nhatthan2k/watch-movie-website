const router = require("express").Router();
const movieController = require("../app/controller/movieController");

router.post("/", movieController.addMovie);
router.get("/", movieController.getAllmovie);
router.get("/:id", movieController.getAMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router