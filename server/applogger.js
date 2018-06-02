'use strict';

const log4js = require('log4js');
const path = require('path');

log4js.configure(path.join(__dirname, './log4js.conf.json'), {
  cwd: path.resolve(__dirname, '..', 'logs')
});

const logger = log4js.getLogger('gif');

module.exports = logger;