import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
// import dotenv from 'dotenv';
// import "dotenv/config.js";
// dotenv.config();
var swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'bookstore',
            version: '1.0',
            description: 'bookStore API documentation',
            contact: { asma: 'abderahmen.asma@gmail.com' },
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
            {
                name: 'users',
                description: 'this tag is for the users services'
            },
            {
                name: 'auth',
                description: 'this tag is for the authentication and api security services'
            },
            {
                name: 'authors',
                description: 'this tag is for the book authors services'
            },
            {
                name: 'books',
                description: 'this tag is for the books services'
            },
        ],
        definitions: {
            users: {
                type: "object",
                properties:
                {
                    id: {
                        type: "string",
                    },
                    username: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    }
                }
            },
            auth: {
                type: "object",
                properties:
                {
                    _id: {
                        type: "string",
                    },
                    token: {
                        type: "string",
                    },
                    refresh_token: {
                        type: "string",
                    },

                }
            },
            authors: {
                type: "object",
                properties:
                {
                    _id:
                    {
                        type: "string"
                    },
                    fullname:
                    {
                        type: "string"
                    },
                    biography:
                    {
                        type: "string"
                    },
                    image:
                    {
                        type: "string"
                    },

                }
            },
            books: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",

                    },
                    price: {
                        type: "number",
                    },
                    author: {
                        $ref: "#/definitions/authors",
                    },
                    pages: {
                        type: "string",
                    },
                    image: {
                        type: "string",
                    },
                }
            }
        }
    },
    apis: ["index.js", "./documentations/*/index.js"]
};
var swaggerDocs = swaggerJsDoc(swaggerOptions);
export default class Swagger {
    constructor(express) {
        this.express = express
    };
    register() {
        this.express.use('/api/bookstore/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        this.express.use('/api/storage', express.static('storage'));
    };
}



