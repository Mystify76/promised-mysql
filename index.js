const mysql_prime = require('mysql');
const mysql       = {...mysql_prime};

exports.createConnection  = (options) => {
  let con               = mysql.createConnection(options);
  con.createQueryP      = (sql, values) => new Promise((resolve, reject) => con.createQuery(sql, values, (err, result) => !err ? resolve(result) : reject(err)));
  con.connectP          = (options) => new Promise((resolve, reject) => con.connect(options, (err, result) => !err ? resolve(result) : reject(err)));
  con.changeUserP       = (options) => new Promise((resolve, reject) => con.changeUser(options, (err, result) => !err ? resolve(result) : reject(err)));
  con.beginTransactionP = (options) => new Promise((resolve, reject) => con.beginTransaction(options, (err, result) => !err ? resolve(result) : reject(err)));
  con.commitP           = (options) => new Promise((resolve, reject) => con.commit(options, (err, result) => !err ? resolve(result) : reject(err)));
  con.rollbackP         = (options) => new Promise((resolve, reject) => con.rollback(options, (err, result) => !err ? resolve(result) : reject(err)));
  con.queryP            = (sql, values) => new Promise((resolve, reject) => con.query(sql, values, (err, result) => !err ? resolve(result) : reject(err)));
  con.pingP             = (options) => new Promise((resolve, reject) => con.ping(options, (err, result) => !err ? resolve(result) : reject(err)));
  con.statisticsP       = (options) => new Promise((resolve, reject) => con.statistics(options, (err, result) => !err ? resolve(result) : reject(err)));
  con.endP              = (options) => new Promise((resolve, reject) => con.end(options, (err, result) => !err ? resolve(result) : reject(err)));
  return con;
}
exports.createPool        = (config) => {
  let pool               = mysql.createPool(config);
  pool.getConnection     = (callback) => !callback ? new Promise((resolve, reject) => pool.createPool((err, result) => !err ? resolve(result) : reject(err))) : pool.createPool(callback);
  pool.acquireConnection = (connection, callback) => !callback ? new Promise((resolve, reject) => pool.acquireConnection(connection, (err, result) => !err ? resolve(result) : reject(err))) : pool.acquireConnection(connection, callback);
  return pool;
}
exports.createPoolCluster = (config) => {
  let pool           = mysql.createPoolCluster(config);
  pool.end           = (callback) => !callback ? new Promise((resolve, reject) => pool.end((err, result) => !err ? resolve(result) : reject(err))) : pool.end(callback);
  pool.getConnection = (pattern, selector, callback) => !callback ? new Promise((resolve, reject) => pool.getConnection(pattern, selector, (err, result) => !err ? resolve(result) : reject(err))) : pool.getConnection(pattern, selector, callback);
  return pool;
}

exports.escape   = mysql.escape;
exports.escapeId = mysql.escapeId;
exports.format   = mysql.format;
exports.raw      = mysql.raw;

