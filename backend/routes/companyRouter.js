const Router = require('express');
const router = new Router();
const companyController = require('../controllers/company_controller');
const authController = require('../controllers/auth_controller');
// const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', companyController.get_companys);
router.get('/:id', companyController.get_one_company);
// router.post('/', checkRoleMiddleware("ADMIN"), authController.register);
router.patch('/avatar', authMiddleware, companyController.upload_avatar);
router.patch('/:id', authMiddleware, companyController.update_data);
// router.delete('/:id', checkRoleMiddleware("ADMIN"), usersController.delete);

module.exports = router;