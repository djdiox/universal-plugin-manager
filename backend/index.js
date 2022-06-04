import puppeteer from 'puppeteer';
import fs from 'fs';
import fetch from 'node-fetch';
import _ from 'lodash';
// import configs from './data/apps.json'
const configs = JSON.parse(fs.readFileSync('./data/apps.json'));
async function requestAPI(url, path, config = configs[0]) {
    var result = await fetch(url, {
        headers: config.request.headers
    });
    console.log('Result: ', result);
    var data = await result.json();
    console.log('data', data);
    fs.writeFileSync(path, JSON.stringify(data.results, null, 2), 'utf-8');
    return data.results;;
}

const seedData = async () => {
    // const source = JSON.parse(JSON.stringify(configs))
    try {
        for (let i = 0; i < configs.length; i++) {
            const config = configs[i];
            console.log('Requesting wox', config);
            const dataPath = './data/' + config.name + '/';
            if (!fs.existsSync(dataPath)) {
                fs.mkdirSync(dataPath);
            }
            let existingItems = []
            const file = `${dataPath}data.json`;
            if (fs.existsSync(file)) {
                existingItems = JSON.parse(fs.readFileSync(file));
            }
            // const createOrUpdateItems = (newItems = []) => {
            //     console.log('updating existing with newItems', newItems)
            //     _.forEach(newItems, newItem => {

            //     })
            //     return newItems;
            // }
            config.file = file;
            const newData = await Promise.all(
                _.map(config.request.api_urls, url => {
                    return requestAPI(url, file, config);
                }))
            const updated = _.reduce(newData, (acc, newItems) => {
                return [...acc, ...newItems]
            })
            const ordered = _.sortBy(updated, 'id');
            fs.writeFileSync(file, JSON.stringify(ordered, null, 2))
        }
        fs.writeFileSync('./data/apps.json', JSON.stringify(configs, null, 2), 'utf-8')
    } catch (error) {
        throw error
    }
}


const readPageHeadless = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // await browser.close();
}
seedData()