import fs from 'fs';
import {exec} from 'child_process';

function execute(command: string) : Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, function (error, stdout, stderr) {
            if(error) {
                reject(error + '\n' + stdout + '\n' + stderr);
            } else {
                resolve(stdout);
            }
        });
    })
};

export default async () => {
    const config = JSON.parse(fs.readFileSync('../public/config.json', 'utf-8'));
    const passwordApp = config.apps.find((e: any) => e.name.toLowerCase() === '1password');
    let result = await execute(passwordApp.cli.commands['list-items']);
    result = res.
    fs.writeFileSync('../data/1password/items.json', result);
    console.log(JSON.parse(result));
    //   const result = Buffer.from(buffer)
};