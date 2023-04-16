const Router = require('express');
const router = new Router();
const Account_favorite_controller = require('../controllers/account_favorite_controller');
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', authMiddleware, Account_favorite_controller.state);
router.post('/', authMiddleware, Account_favorite_controller.subscribe);
router.delete('/', authMiddleware, Account_favorite_controller.unsubscribe);

module.exports = router;