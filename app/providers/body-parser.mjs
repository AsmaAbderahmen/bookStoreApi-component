import  bp from 'body-parser';
export default  class BodyParser {
  constructor (express) {
    this.express = express
  }

  register () {
    this.express.use(`/${process.env.API_PREFIX}/*`, bp.json());
    this.express.use(`/${process.env.API_PREFIX}/*`, bp.urlencoded({
      limit: '50mb',
      parameterLimit: 100000,
      extended: true
    }))
  }
}

//export default bodyParser = BodyParser
