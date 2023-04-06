const Router = require("express");
const router = new Router();
const AuthController = require("../controllers/auth_controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", AuthController.register_account);
router.post("/register/user", authMiddleware, AuthController.register_user);
router.post("/register/company", authMiddleware, AuthController.register_company);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/password-reset", AuthController.password_reset);
router.post("/password-reset/:token", AuthController.password_confirm);
router.get("/refresh", AuthController.handleRefreshToken);
router.get("/validation", authMiddleware, AuthController.send_link);
router.get("/validation/:id", authMiddleware, AuthController.email_confirm);

module.exports = router;
