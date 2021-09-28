import cors from '../providers/cors.mjs'
import BodyParser from '../providers/body-parser.mjs'
import Morgan from '../providers/morgan.mjs'
import Swagger from '../providers/swagger.mjs'

export const services =[cors,BodyParser, Morgan, Swagger];

