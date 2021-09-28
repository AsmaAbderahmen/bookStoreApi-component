import  swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import dotenv from 'dotenv';
import "dotenv/config.js";
dotenv.config();
var swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'bookstore',
            version:'1.0',
            description: 'bookStore API documentation',
            contact: {asma:'abderahmen.asma@gmail.com'},
            servers: ["http://localhost:3000"]
        },
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                name: "authorization",
                in: "header"
            }
        },
        tags: [

        ],
        definitions: {
         
        }
    },
    apis: ["index.js", "./documentations/*/index.js"]
};
var swaggerDocs = swaggerJsDoc(swaggerOptions);
export default class Swagger {
    constructor (express) {
        this.express = express
    };
    register () {
        this.express.use('/api/bookstore/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        this.express.use('/api/storage', express.static('storage'));
    };
}



