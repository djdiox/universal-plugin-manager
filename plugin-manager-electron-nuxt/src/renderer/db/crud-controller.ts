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
  async getById (id?: string): Promise<App> {
    await db.read()
    return _.find(db?.data?.apps, (app: App) => app.id === id)
  }

  async getAll (): Promise<Array<App>> {
    await db.read()
    return db?.data?.apps || []
  }

  async create (body: App): Promise<Number> {
    await db.read()
    return db?.data?.apps.push(body) || 0
  }

  async update (data: App, id: string): Promise<App> {
    const index = db?.data?.apps.findIndex(e => e.id === id) || -1
    if (index === -1) {
      throw new Error('Can not find app')
    }
    const result = Object.assign(db?.data?.apps[index] || {}, data)
    // db?.data?.apps[index] = result
    await db.write()
    return result
  }

  async delete (id: string): Promise<void> {
    await db.read()
    const index = db?.data?.apps.findIndex(e => e.id === id) || -1
    if (index === -1) {
      throw new Error('Can not find app')
    }
    delete db?.data?.apps[index]
    await db.write()
  }
}
