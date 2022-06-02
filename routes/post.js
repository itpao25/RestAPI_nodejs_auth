const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({ post: { title: 'my first post', description: 'Test description' } });
});

module.exports = router;