const gypService = require('./gyp.service');

const getMyGypVideo = function(limit, done){
	gypService.getMyGypVideo(limit, done);
}

module.exports = {
	getMyGypVideo
}