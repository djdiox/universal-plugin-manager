import fs from 'fs';
import { exec, execSync } from 'child_process';
import { CustomLogger } from './common/logger';
let config = JSON.parse(fs.readFileSync('../public/config.json', 'utf8'))

// import axios from 'axios';
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
    logger.info('Starting Seed Actions', config);
    logger.info('info', config);
    // const config = JSON.parse(fs.readFileSync('../public/config.json', 'utf-8'));

    const passwordApp = config.apps.find((e: any) => e.name.toLowerCase() === '1password')
    let result = await execute(passwordApp?.cmds?.json['list-items'] || '');
    result = JSON.parse(result);
    CustomLogger.Logger.info('Who gets smashed at kwicky mart?', passwordApp)
    fs.writeFileSync('../data/1password/items.json', JSON.stringify(result, null, 2));
    const getItem = passwordApp?.cmds?.json['get-item'].replace('{id]', result);
    try {
        const cmd = await execute(getItem || '');
        logger.info(cmd + ' has been successfully tested');
    } catch (error) {
        logger.error(getItem, result, passwordApp);
    }

    // console.log(allItems);
    const packageManagers = config.packageManagers.map((packageManager: { name: any; cmds: { json: { info: any; }; }; }) => {
        logger.info(`${packageManager.name} ${packageManager?.cmds?.json?.info}`);
        return packageManager;
    });
};