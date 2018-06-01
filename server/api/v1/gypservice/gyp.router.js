const router = require('express').Router();
const gypCtrl = require('./gyp.controller');
const lodash = require('lodash');

router.get('/', function(req, res){
	try {

		let limit = req.query.limit || 10;

		gypCtrl.getMyGypVideo(limit, function(err, result){
			if(err){
				console.log("error while getting gyp videos with limit", err);
				res.status(404).send(" failed to load gyp videos");
				return;
			}
			res.send(result);
			return;
		})
	} catch(err) {
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
	}
})

module.exports = router;