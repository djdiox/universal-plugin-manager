import { Low, JSONFile } from 'lowdb'
import * as _ from 'lodash'
import { App } from '../../types/apps'
import { ICRUDController } from './plugin-db-adapter'
type Data = {
  apps: App[]
}

const adapter = new JSONFile<Data>('db.json')
const db = new Low(adapter)

export default class CrudController implements ICRUDController {
  private db: Low

  constructor () {
    const adapter = new JSONFile<Data>('apps.json')
    this.db = new Low<Data>(adapter)
  }

  async getById (id?: string): Promise<App> {
    await this.db.read()
    return _.find(db.data.apps, (app: App) => app.id === id)
  }

  async getAll (): Promise<Array<App>> {
    await this.db.read()
    return db.data.apps
  }

  async create (body: App): Promise<Number> {
    await this.db.read()
    return db.data.apps.push(body)
  }

  async update (data: App, id: string): Promise<App> {
    const index = db.data.apps.findIndex(e => e.id === id)
    const result = Object.assign(db.data.apps[index], data)
    db.data.apps[index] = result
    await db.read()
    return result
  }

  async delete (id: string): Promise<void> {
    await db.read()
    const index = db.data.apps.findIndex(e => e.id === id)
    delete db.data.apps[index]
    await db.write()
  }
}
