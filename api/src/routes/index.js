const { Router } = require('express');
const router = Router();
const controllers = require('./routersControllers.js');
const routersUser = require('./routersUser.js');
const routersReview=require('./routersReview.js');

router.use('/products', controllers);
router.use('/user', routersUser);
router.use('/review', routersReview);
module.exports = router;
