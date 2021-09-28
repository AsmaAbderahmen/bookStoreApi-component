import fs from 'fs'
import path from 'path'


export default class ComponentManager {
    constructor(express) {
        this.express = express;
        this.path = path.join(process.env.PWD, 'components');
        this.disabledComponents = []
    }

    registerComponents() {
        fs.readdirSync(this.path).forEach(dir => {
            this.registerComponent(dir);
            this.registerModels(path.join(this.path, dir), dir)
        })
    }

  async  registerComponent(name) {
        if (this.isValidComponent(name)) {
            this.express.use(`/${process.env.API_PREFIX}/` + name, await   import('../components/' + name + '/' + name + '-routes.mjs').then((fn)=>  fn.Router ))
        } else {
            console.error(path.join(this.path, name) + ' is not valid or may be disabled')
        }
    }

    registerModels(dir, name) {
        fs.readdirSync(dir).forEach(file => {
            let classFile = path.join(name, path.basename(file));
            import('../components/' + classFile.replace(/\\/g, "/"))
        })
    }

    isValidComponent(name) {
        let files = fs.readdirSync(path.join(this.path, name));
        let hasFile = files.includes(name + '-routes.mjs');
        let notDisabled = !this.disabledComponents.includes(name);
        return hasFile && notDisabled
    }
}


