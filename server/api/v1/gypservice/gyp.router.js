const router = require('express').Router();
const gypCtrl = require('./gyp.controller');
const logger = require('../../../applogger');

/*
* api/v1/gyp/trending end uri
* this router is for getting trending GIF's with limit default 10;
*/
router.get('/trending', function(req, res){
	try {

		let limit = req.query.limit || 10;

		gypCtrl.getTrendingGypVideo(limit, function(err, result){
			if(err){
				console.log("error while getting trending gif videos with limit", err);
				res.status(404).send(" failed to load gyp videos");
				return;
			}
			res.status(200).send(result);
			return;
		})
	} catch(e) {
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
	}
})

/*
* api/v1/gyp/:{serachTring} end uri
* this router is for getting GIF's matching to the searchString with limit default 10;
*/
router.get('/gifs/:gif', function(req, res){
	try {

		let limit = req.query.limit || 10;
		let searchQuery = req.params.gif || '';

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

/*
* api/v1/gyp/favourites end uri
* this router is for adding favourites GIF's which user want to add;
* saves to database
*/
router.post('/favourites', function(req, res){
	try {

		let newFavouriteItem = req.body;

		gypCtrl.saveMyFavourites(newFavouriteItem, function(err, result){
			if(err){

				logger.error("error in adding favourites", err);
				res.status(404).send("failed to save favourites", err);
				return;
			} else {
				res.status(200).send(result);
				return;
			}
		})
	} catch(error) {
		logger.error("error in adding favourites", error);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
	}
})

/*
* api/v1/gyp/favouriteList end uri
* this router is for getting favouriteList GIF's with limit default 10;
* gets data from database
*/
router.get('/list', function(req, res){
	try {

		let limit = req.query.limit || 10 ;

		gypCtrl.getMyFavourites(limit, function(err, result){
			if(err){

				logger.error("error in getting favourites", err);
				res.status(404).send(" error in getting favourites");
				return;
			} else {
				logger.debug("fetching from db", result);
				res.status(200).send(result);
				return;
			}
		})
	} catch(error) {

		logger.error("error in getting favourites", error);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
	}
})

module.exports = router;