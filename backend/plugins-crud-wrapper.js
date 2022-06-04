import _ from 'lodash';
module.exports = {
    async read(platform = 'wox', options = {limit:100, page: 1, fields: []}) {
        const {limit, page} = options;
        let plugins = JSON.parse(fs.readFileSync('./data/' + platform + '/data.json', 'utf8'));
        if(options == 'all' | limit === 0) {
            return plugins;
        }
        if (limit > 0) {
            const end = page * limit;
            const start = end - limit;
            return _.slice(plugins, start, end);
        }
        return plugins;
    }
}