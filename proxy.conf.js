const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:3000/',
    secure: false,
    logLevel: 'debug',
    pathReqrite: { '^/api': '' },
  },
];

module.exports = PROXY_CONFIG;
