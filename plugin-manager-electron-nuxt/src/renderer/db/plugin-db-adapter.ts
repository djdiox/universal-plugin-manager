import log from 'electron-log'
import { App } from '~/../types/apps'
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
export class ActionResult {
  message: string
  data: any
  success: boolean
  constructor (_message: string, _data: any, _success: boolean) {
    this.message = _message
    this.data = _data
    this.success = _success
  }
}

export interface ICRUDController {
  create: (body: App) => any
  getById: (id?: string) => Promise<App>
  getAll: () => Promise<Array<App>>
  update: (data: any, id: string) => Promise<App>
  delete: (id: string) => Promise<void>
}

export interface IDataSourceAdapter {
  CollectionName: string
  crudController: ICRUDController
  create: (id: string, data: any) => Promise<ActionResult>
  upsert: (id: string, data: any) => Promise<ActionResult>
  delete: (id: string) => Promise<ActionResult>
  update: (data: any, id: string) => Promise<ActionResult>
  read: (id: string) => Promise<ActionResult>
}

export class DbHandler implements IDataSourceAdapter {
  CollectionName: string
  crudController: ICRUDController
  constructor (dbController: ICRUDController, _collectionName: string) {
    this.crudController = dbController as ICRUDController
    this.CollectionName = _collectionName
    log.info('DBHandler is initialized')
  }

  async create (data: any) {
    log.log('Creating new Database entry', data)
    try {
      const result = await this.crudController.create(data)
      log.info('Successfully created database entry', result)
      return result
    } catch (error) {
      log.error('Error while creating entry', data, error)
      throw error
    }
  }

  async upsert (data: any, id: any) {
    log.log('Creating or Updating Database entry', { data, id })
    try {
      let result = await this.read(data.id)
      if (result) {
        result = await this.update(data, result.data.id)
        log.info('Successfully updated database entry', result)
      } else {
        result = await this.create(data)
        log.info('Successfully creating database entry', result)
      }
      return result
    } catch (error) {
      log.error('Error while upserting entry', data, error)
      throw error
    }
  }

  async delete (id: string): Promise<ActionResult> {
    await this.crudController.delete(id)
    return new ActionResult('Successfully deleted database entry', id, true)
  }

  async update (data: any, id: string): Promise<ActionResult> {
    log.log('Updating new Database entry', { data, id })
    try {
      const result = await this.crudController.update(data, id)
      log.info('Successfully updated database entry', result)
      return new ActionResult('Successfully deleted database entry', result, true)
    } catch (error) {
      log.error('Error while updating entry', data, error)
      throw error
    }
  }

  async read (id?: string): Promise<ActionResult> {
    log.log('Getting Database entry', { id })
    try {
      const result = await this.crudController.getById(id)
      log.info('Successfully getting database entry', result)
      return new ActionResult('Successfully deleted database entry', result, true)
    } catch (error) {
      log.error('Error while getting entry', id, error)
      throw error
    }
    // const result = await this.dynamoDB.getItem({ TableName: this.collectionName, Key: }, null).promise()
  }
}
