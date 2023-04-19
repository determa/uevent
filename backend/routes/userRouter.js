const Router = require('express');
const router = new Router();
const usersController = require('../controllers/user_controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', usersController.get_users);
router.get('/:id', usersController.get_one_user);
router.patch('/:id', authMiddleware, usersController.update_data);

module.exports = router;