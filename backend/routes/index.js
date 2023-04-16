const Router = require("express");
const router = new Router();

const authRouter = require('./authRouter');
const categoriesRouter = require('./categoriesRouter');
const commentsRouter = require('./commentsRouter');
const eventRouter = require('./eventRouter');
const userRouter = require('./userRouter');
const companyRouter = require('./companyRouter');
const ticketRouter = require('./ticketRouter');
const themesRouter = require('./themesRouter');
const accountFavoriteRouter = require('./accountFavoriteRouter');
const companyNotifRouter = require('./companyNotifRouter');
const eventNotifRouter = require('./eventNotifRouter');

router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/comments', commentsRouter);
router.use('/events', eventRouter);
router.use('/user', userRouter);
router.use('/company', companyRouter);
router.use('/ticket', ticketRouter);
router.use('/themes', themesRouter);
router.use('/favorite', accountFavoriteRouter);
router.use('/company-notification', companyNotifRouter);
router.use('/event-notification', eventNotifRouter);

module.exports = router;
