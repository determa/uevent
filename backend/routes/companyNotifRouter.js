const Router = require('express');
const router = new Router();
const Company_notif_controller = require('../controllers/company_notif_controller');
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', authMiddleware, Company_notif_controller.state);
router.post('/', authMiddleware, Company_notif_controller.subscribe);
router.delete('/', authMiddleware, Company_notif_controller.unsubscribe);

module.exports = router;