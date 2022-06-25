import fs from 'fs'
import _ from 'lodash'
import { App } from '../../src/types/apps'
import { ICRUDController } from './plugin-db-adapter'

export default class CrudController implements ICRUDController {
  createOrUpdateMany (apps: App[]) {
    const existingApps: App[] = JSON.parse(fs.readFileSync('./apps.json', 'utf-8'))
    const newApps = existingApps.map((app: App) => {
      const newApp = apps.find(newApp => app.id === newApp.id)
      return newApp || app
    })
    fs.writeFileSync('./apps.json', JSON.stringify(newApps))
  }

  async getById (id?: string): Promise<App> {
    const apps: App[] = JSON.parse(fs.readFileSync('./apps.json', 'utf-8'))
    return _.find(apps, (app: App) => app.id === id) || { id: _.uniqueId() }
  }

  async getAll (): Promise<Array<App>> {
    const apps: App[] = JSON.parse(fs.readFileSync('./apps.json', 'utf-8'))
    return apps || []
  }

  async create (body: App): Promise<Number> {
    const apps: App[] = JSON.parse(fs.readFileSync('./apps.json', 'utf-8'))
    const index = apps.push(body) || 0
    fs.writeFileSync('./apps.json', JSON.stringify(apps))
    return index
  }

  async update (data: App, id: string): Promise<App> {
    const apps: App[] = JSON.parse(fs.readFileSync('./apps.json', 'utf-8'))
    const index = apps.findIndex(e => e.id === id) || -1
    if (index === -1) {
      throw new Error('Can not find app')
    }
    const result = Object.assign(apps[index] || {}, data)
    fs.writeFileSync('./apps.json', JSON.stringify(apps))
    return result
  }

  async delete (id: string): Promise<void> {
    const apps: App[] = JSON.parse(fs.readFileSync('./apps.json', 'utf-8'))
    const index = apps.findIndex(e => e.id === id) || -1
    if (index === -1) {
      throw new Error('Can not find app')
    }
    delete apps[index]
    fs.writeFileSync('./apps.json', JSON.stringify(apps))
  }
}
