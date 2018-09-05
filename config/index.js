const {NODE_ENV = 'development'} = process.env;
module.exports = require(`./${NODE_ENV}`);
module.exports.NODE_ENV = NODE_ENV;