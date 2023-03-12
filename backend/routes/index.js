const Router = require("express");
const router = new Router();

const authRouter = require('./authRouter');
const categoriesRouter = require('./categoriesRouter');
const commentsRouter = require('./commentsRouter');
const eventRouter = require('./eventRouter');

router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/comments', commentsRouter);
router.use('/events', eventRouter);

module.exports = router;
