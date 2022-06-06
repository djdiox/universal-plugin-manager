import fs from 'fs';
import { exec } from 'child_process';
import config from '../public/config.json';
import { CustomLogger } from './common/logger';
import axios from 'axios';
function execute(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, function (error, stdout, stderr) {
            if (error) {
                reject(error + '\n' + stdout + '\n' + stderr);
            } else {
                resolve(stdout);
            }
        });
    })
};

export default async () => {
    var logger = CustomLogger.Logger;
    CustomLogger.Logger.info('Starting Seed Actions', config);
    CustomLogger.Logger.info('info', config);
    // const config = JSON.parse(fs.readFileSync('../public/config.json', 'utf-8'));

    const passwordApp = config.apps.find((e: any) => e.name.toLowerCase() === '1password')
    let result = await execute(passwordApp?.cmds?.json['list-items'] || '');
    fs.writeFileSync('../data/1password/items.json', result);
    const getItem = passwordApp?.cmds?.json['get-item'];
    execute('get-item', getItem)
    // const allItems = await axios.get(url, {
        
    // })
    console.log(allItems);
    config.packageManagers.map(packageManager => {
        logger.info(`${packageManager.name} ${packageManager?.cmds?.json?.info`)
    });

    //   const result = Buffer.from(buffer)
};