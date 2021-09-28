import fs from 'fs';
import path from 'path';
import _ from 'lodash';
const __dirname = path.resolve(path.dirname(''));


class Config {
    constructor () {
        this.path = path.join(__dirname, './app/config');
        this.config = {};
        this.fetchConfig()
    }
    fetchConfig () {
        fs.readdirSync(this.path).forEach(file => {
            let name = this.getFilename(file);
            this.config[name] ='./app/config/' +name+'.js'
        })
    }
    getFilename (file) {
        return file.split('.')[0] || null
    }
    get (path, def) {
        return _.get(this.config, path, def)
    }

    set (path, value) {
        return _.set(this.config, path, value)
    }
}

export const ConfigManager = Config;

