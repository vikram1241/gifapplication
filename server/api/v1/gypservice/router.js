const router = require('express').Router();

router.use('/gyp', require('./gyp.router.js'));

module.exports = router;