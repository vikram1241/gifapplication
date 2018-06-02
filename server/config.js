let config = {
	GYP_API_URL: 'some url',
	API_KEY : 'some key',
	PORT: process.env.PORT || 8080,
	MONGO_URL: 'mongodb://localhost:27017/gif'
}

module.exports = config;