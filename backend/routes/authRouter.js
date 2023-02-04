const Router = require("express");
const router = new Router();
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const checkCookies = require("../middleware/checkCookies");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/password-reset", AuthController.resetPasswordLink);
router.post("/password-reset/:token", AuthController.resetPassword);
router.get("/email-confirm/:token", AuthController.emailConfirm);
router.get("/refresh", checkCookies, AuthController.check); //пока не работает, планировал сюда refresh bearer token добавить
router.get("/whoami", authMiddleware, AuthController.check);

module.exports = router;
