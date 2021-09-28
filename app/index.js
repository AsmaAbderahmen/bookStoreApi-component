import http from 'http';
import https from 'https';
import express from 'express';
import {Db_connect_file} from './config/database.js';
import {ConfigManager} from './config-manager.js';
import {services} from './config/service-provider.js';
import ComponentManager from './component-manager.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

let db = new Db_connect_file();

class Application {
    constructor() {
        let config = new ConfigManager();
        this.services = services;
        this.express = express();
        this.express.use(express.static('public'));

        this.serverConfig = config.get('server');
        this.dbConfig = config.get('database');
        this.serviceProviders = config.get('service-provider')
    }

    setUpServer() {
        this.createServer(this.serverConfig.protocol === 'https')
    }

    async setUpDatabase() {
        await db.connect().catch(e => console.error(e))
    }

    registerServiceProviders() {
        this.services.forEach(ServiceProvider => {
            try {
                let instance = new ServiceProvider(this.express, this.server, this.serverConfig);

                if (typeof instance.register === 'function') {
                    instance.register()
                }
            } catch (err) {
                console.error(err)
            }
        })
    }

    installServiceProviders() {
        this.services.forEach(ServiceProvider => {
            try {
                let instance = new ServiceProvider(this.express, this.server, this.serverConfig);

                if (typeof instance.install === 'function') {
                    instance.install()
                }
            } catch (err) {
                console.error(err)
            }
        })
    }
    createServer(secure) {
        if (secure === true) {
            this.server = https.createServer(this.serverConfig.certificates, this.express)
        } else {
            this.server = http.createServer(this.express)
        }

        // register service provider
        this.registerServiceProviders();

        // register components
        new ComponentManager(this.express).registerComponents();
        this.installServiceProviders();
        return this.server
    }
    getExpress() {
        return this.express
    }
    getServer() {
        return this.server
    }
    getRouter() {
        return express.Router()
    }
    getDatabase() {
        return this.express.db
    }
    async run() {
        this.setUpDatabase();
        this.setUpServer();
        this.express.get("/getimage/:img",function (req,res) {
             res.sendFile(__dirname+"/middlewares/images/"+req.params.img)
        });
        this.express.get("/test",function (req,res) {
            res.send('welcome bookStore api')
        });

        this.server.listen(process.env.PORT || 3000);


    }
}

export const App = new Application();

