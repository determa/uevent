const Router = require("express");
const router = new Router();
const CategoriesController = require("../controllers/categories_controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:id", CategoriesController.get_all_categories);
router.get("/event/:id", CategoriesController.get_categories_by_event);
router.post("/", authMiddleware, CategoriesController.create);
router.patch("/:id", authMiddleware, CategoriesController.update);
router.delete("/:id", authMiddleware, CategoriesController.delete);

module.exports = router;
