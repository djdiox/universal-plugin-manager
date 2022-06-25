const client = require('@doist/todoist-api-typescript')
const dotenv = require('dotenv')
const _ = require('lodash')
dotenv.config()
module.exports = {
  async getTasks () {
    console.log('Requesting tasks', process.env.TODOIST_API_TOKEN)
    const api = new client.TodoistApi(process.env.TODOIST_API_TOKEN)
    const projects = await api.getProjects()
    console.log('Restrieved labels', projects)
    const labels = await api.getLabels()
    console.log('Restrieved labels', labels)
    const tasks = await Promise.all(
      _.map(projects, async project => {
        console.log('Searching on "' + project.name + '", ID: "' + project.id + '"')
        const res = await api.getTasks({ projectId: project.id })
        console.log('Retrieved tasks', res)
        return res
      })
    )

    const joined = _.reduce(
      tasks,
      (complete, tasks) => {
        console.log('Mapping tasks', tasks, complete)
        complete = [...tasks, ...complete]
        return complete
      },
      []
    )
    console.log('final', joined)
    return joined
  }
}
