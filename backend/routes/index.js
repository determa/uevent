const Router = require("express");
const router = new Router();

const authRouter = require('./authRouter');
const categoriesRouter = require('./categoriesRouter');
const commentsRouter = require('./commentsRouter');
const eventRouter = require('./eventRouter');
const userRouter = require('./userRouter');
const companyRouter = require('./companyRouter');
const paymentRouter = require('./paymentRouter');

router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/comments', commentsRouter);
router.use('/events', eventRouter);
router.use('/user', userRouter);
router.use('/company', companyRouter);
router.use('/payment', paymentRouter);

module.exports = router;
