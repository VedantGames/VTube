const Router = require('express');

const { addComment } = require('../controllers/Comment.controller');

const router = Router();

router.route('/add-comment').post(addComment);

module.exports = router;