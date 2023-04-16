const Router = require('express');
const router = new Router();
const Event_notif_controller = require('../controllers/Event_notif_controller');
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', authMiddleware, Event_notif_controller.state);
router.post('/', authMiddleware, Event_notif_controller.subscribe);
router.delete('/', authMiddleware, Event_notif_controller.unsubscribe);

module.exports = router;