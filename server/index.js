const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dateFormat = require('date-format');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const shareSocketConnection = require('./socketServer');

const app = express();
const io = require('socket.io')(app);
// Helmet helps you secure your Express apps by setting various HTTP headers, it helps in hardening the web server at least for minimal threats
app.use(helmet());

//Initilise mongo connection
const mongoConn = require('./mongoConnection');
mongoConn();

morgan.token('time', (req, res) => dateFormat.asString(dateFormat.ISO8601_FORMAT, new Date())); //Both morgan and log4js are configured to same date format, so that log reading is meaningful and not confusing due to different date formats
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(compression());

//app.use(express.static('dist'));

app.use('/api/v1', require(path.join(__dirname, 'api/v1')));

io.on('connection', function(socket){
	shareSocketConnection.getConnection(socket);
})

app.listen(3000, () => console.log('Listening on port 3000!'));
