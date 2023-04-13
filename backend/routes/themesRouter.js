const Router = require("express");
const router = new Router();
const themes_controller = require("../controllers/themes_controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", themes_controller.get_all_themes);
// router.get("/event/:id", themes_controller.get_categories_by_event);
router.post("/", authMiddleware, themes_controller.create);
router.patch("/:id", authMiddleware, themes_controller.update);
router.delete("/:id", authMiddleware, themes_controller.delete);

module.exports = router;
