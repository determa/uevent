const Router = require('express');
const router = new Router();
const companyController = require('../controllers/company_controller');
const authController = require('../controllers/auth_controller');
// const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', companyController.get_companys);
router.get('/:id', companyController.get_one_company);
router.patch('/:id', authMiddleware, companyController.update_data);

module.exports = router;