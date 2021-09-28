import app_module_path from 'app-module-path';
import {App} from './app/index.js';

if (!process.env.PWD)
    process.env.PWD = process.cwd();
app_module_path.addPath(process.env.PWD);

App.run();




