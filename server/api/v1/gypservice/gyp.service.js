const request = require('superagent');
const gifEntity = require('./gyp.entity');
const logger = require('../../../applogger');
const config = require('../../../config');


const getTrendingGypVideo = function(limit, done){

  request
   .get(`${config.API_URL}/trending?api_key=${config.API_KEY}&limit=${limit}`)
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
        logger.error('Cannot get list of gif:', msg, " for ", limit);
        done(null, gypColln);
        return;
      }
      done(null, res.body);
      return;
   })
}

// getting gif which matches to search query
const getMyGypVideo = function(limit, searchQuery, done){

  let URL = `${config.API_URL}/search?q=${searchQuery}&api_key=${config.API_KEY}&limit=${limit}`;
  logger.debug("search url", URL);
	request
	 .get(URL)
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
        logger.error('Cannot get list of gif', msg, " for ", limit);
        done(null, gypColln);
        return;
      }

      done(null, res.body);
      return;
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
      logger.error("Error in saving favourite gif ", err);
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
  getTrendingGypVideo,
	getMyGypVideo,
  saveMyFavourites,
  getMyFavourites
}