

export default Server  = {
  env: process.env.NODE_ENV || 'development',
  protocol: 'http', //needs to be changed to https for production purposes
  host: 'localhost',
  port: process.env.PORT || 3000,
  certificates: {

  }
};
