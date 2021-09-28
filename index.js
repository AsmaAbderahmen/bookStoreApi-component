import app_module_path from 'app-module-path';
import {App} from './app/index.js';

import dotenv from 'dotenv';
import "dotenv/config.js";
dotenv.config();

dotenv.config();

if (!process.env.PWD)
    process.env.PWD = process.cwd();
app_module_path.addPath(process.env.PWD);

App.run();




