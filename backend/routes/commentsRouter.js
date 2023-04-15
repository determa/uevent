const Router = require("express");
const router = new Router();
const CommentsController = require("../controllers/comment_controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/event", CommentsController.get_comments_by_event);
router.get("/user", CommentsController.get_comments_by_user);
router.post("/", authMiddleware, CommentsController.create);
router.patch("/:id", authMiddleware, CommentsController.update);
router.delete("/:id", authMiddleware, CommentsController.delete);

module.exports = router;
