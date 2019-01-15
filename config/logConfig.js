const log4js = require('log4js');
const config = require('./config.json');

log4js.configure({
    appenders: {
      cheeseLogs: {
        type: 'file',
        filename: config.log4js.filename,
        maxLogSize: 5242880, // 当文件到达5兆，压缩文件并重新打开新的日志
        backups: 3, 
        compress: true,
      },
      console: { type: 'console' }
    },
    categories: {
      cheese: { appenders: ['cheeseLogs'], level: 'error' },
      another: { appenders: ['console'], level: 'trace' },
      default: { appenders: ['console', 'cheeseLogs'], level: 'trace' }
    },
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID'
});

exports.logger = function (name) {
    var logger = log4js.getLogger(name);
    return logger;
};