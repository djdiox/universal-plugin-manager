import fs from 'fs';
import { App } from './models';
export default class AppController {
    private apps = new Array<App>();
    constructor() {
        const systemJson = JSON.parse(fs.readFileSync('../public/config.json', 'utf-8'));
        this.apps = systemJson.apps;
    }    
}