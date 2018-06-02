const gypService = require('./gyp.service');

const getMyGypVideo = function(limit, searchQuery, done){
	gypService.getMyGypVideo(limit, searchQuery, done);
}

const saveMyFavourites = function(favourites, done){
	gypService.saveMyFavourites(favourites, done);
}

const getMyFavourites = function(limit, done){
	gypService.getMyFavourites(limit, done);
}

module.exports = {
	getMyGypVideo,
	saveMyFavourites,
	getMyFavourites
}