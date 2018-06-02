let config = {

	API_KEY : `GnpBqlCbplP7dUdp8K6XdtWeE1XD5Zff`,
	API_URL: `http://api.giphy.com/v1/gifs`,
	PORT: process.env.PORT || 8080,
	MONGO_URL: 'mongodb://localhost:27017/gif'
}

module.exports = config;