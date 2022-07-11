const { Client } = require('@notionhq/client')
// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

const notionController = {
  notion,
  async selectObject (query) {
    try {
      const result = await notion.search({
        query,
        sort: {
          direction: 'ascending',
          timestamp: 'last_edited_time'
        }
      })

      return result
    } catch (error) {
      // if(error.)
    }
  },
  selectedDb (dbName) {
    const results = this.selectObject(dbName)
    return results.filter(result => result.object === 'database')
  }
}
module.exports = notionController
