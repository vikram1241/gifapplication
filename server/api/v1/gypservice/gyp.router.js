const router = require('express').Router();
const gypCtrl = require('./gyp.controller');
const lodash = require('lodash');

router.get('/', function(req, res){
	try {

		let limit = req.query.limit || 10;
		let searchQuery = req.query.search || '';

		gypCtrl.getMyGypVideo(limit, searchQuery, function(err, result){
			if(err){
				console.log("error while getting gyp videos with limit", err);
				res.status(404).send(" failed to load gyp videos");
				return;
			}
			res.status(200).send(result);
			return;
		})
	} catch(error) {
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
	}
})

router.post('/favourites', function(req, res){
	try {
		let newFavouriteItem = req.body;

		gypCtrl.saveMyFavourites(newFavouriteItem, function(err, result){
			if(err){
				res.status(404).send("failed to save favourites", err);
				return;
			} else {
				res.status(200).send(result);
				return;
			}
		})
	} catch(error) {
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
	}
})

router.get('/favouriteList', function(req, res){
	try {
		let limit = req.query.limit || 10 ;
		gypCtrl.getMyFavourites(limit, function(err, result){
			if(err){
				res.status(404).send(" error in getting favourites");
				return;
			} else {
				res.status(200).send(result);
				return;
			}
		})
	} catch(error) {
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
	}
})

module.exports = router;