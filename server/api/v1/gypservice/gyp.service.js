const request = require('superagent');
const gifEntity = require('./gyp.entity');
const logger = require('../../../applogger');

const getMyGypVideo = function(limit, searchQuery, done){
  //http://api.giphy.com/v1/gifs/search?q=funny+baby&api_key=GnpBqlCbplP7dUdp8K6XdtWeE1XD5Zff&limit=${limit}
  let url = `http://api.giphy.com/v1/gifs/`;
  let extension = (searchQuery === '') ? `trending?api_key=GnpBqlCbplP7dUdp8K6XdtWeE1XD5Zff&limit=${limit}` : `search?q=${searchQuery}&api_key=GnpBqlCbplP7dUdp8K6XdtWeE1XD5Zff&limit=${limit}`;
	console.log(`${url}/${extension}`)
  request
	 .get(`http://api.giphy.com/v1/gifs/${extension}`)
	 .end((err, res) => {
      let gypColln = {
        gyp: []
      };

      if (err) {
        let msg = "";
        if(res && res.body) {
          msg = res.body;
        } else if (err.response) {
          msg = `Something wrong ${err.response.statusText}`;
        } else {
          msg = 'Something wrong, possible network issues or server not responding..!'
        }
        console.log('Cannot get list of assignment names:', msg, " for ", limit);
        return done(err);
      }
      console.log("this is the response coming", res.body);
      return done(null, res.body);
	 })
}

const saveMyFavourites = function(favourites, done){
  let gifModel = new gifEntity();
  gifModel.title = favourites.title;
  gifModel.gifId = favourites.id;
  gifModel.url = favourites.url;
  gifModel.images = favourites.images;
  //gifModel.source = favourites.source || '';
  gifModel.rating = favourites.rating || '';
  gifModel.type = favourites.type;

  gifModel.save(function(err, savedGif) {
    if (err) {
      logger.debug("Error in saving favourite gif ", err);
      done(err);
    } else {
      done(null, savedGif);
      return
    }
  });
}

const getMyFavourites = function(limit, done){
  gifEntity.find().limit(parseInt(limit)).exec((err, colln) => {
    if(err){
      logger.error(" Error in fetching data", err);
      done(err);
    } else {
      done(null, colln);
      return;
    }
  })
}

module.exports = {
	getMyGypVideo,
  saveMyFavourites,
  getMyFavourites
}