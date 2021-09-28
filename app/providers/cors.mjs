import  cors from 'cors';

export default class Cors {
  constructor (express) {
    this.express = express
  }

  register () {
    this.express.use(cors())
  }
}