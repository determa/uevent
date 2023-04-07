const Router = require('express');
const router = new Router();
const usersController = require('../controllers/user_controller');
const authController = require('../controllers/auth_controller');
// const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', usersController.get_users);
router.get('/:id', usersController.get_one_user);
// router.post('/', checkRoleMiddleware("ADMIN"), authController.register);
router.patch('/avatar', authMiddleware, usersController.upload_avatar);
router.patch('/:id', authMiddleware, usersController.update_data);
// router.delete('/:id', checkRoleMiddleware("ADMIN"), usersController.delete);

module.exports = router;