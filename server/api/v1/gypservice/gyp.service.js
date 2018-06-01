const request = require('superagent');

const getMyGypVideo = function(limit, done){

	request
	 .get(`http://api.giphy.com/v1/gifs/search?q=funny+baby&api_key=GnpBqlCbplP7dUdp8K6XdtWeE1XD5Zff&limit=${limit}`)
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
        done(null, gypColln);
        return;
      }
      console.log("this is the response coming", res.body);
      done(null, res.body);
      return;
	 })
}

module.exports = {
	getMyGypVideo
}