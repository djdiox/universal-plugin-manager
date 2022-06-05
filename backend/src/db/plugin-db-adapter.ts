import { CustomLogger } from '../common/logger';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { Logger } from 'log4js';
enum DbActionMode {
    insert = 0,
    update = 1,
    delete = 2,
    upsert = 3,
    getByid = 4,
    get = 5
}

export interface IActionResult {
    message: string;
    data: any;
    success: boolean;
}

export interface IDataSourceAdapter {
    CollectionName: string;
    crudController: ICRUDController
    create: (id: string, data: any) => Promise<IActionResult>;
    upsert: (id: string, data: any) => Promise<IActionResult>;
    delete: (id: string) => Promise<IActionResult>;
    update: (data: any, id: string) => Promise<IActionResult>;
    read: (id: string) => Promise<IActionResult>;
}

export interface ICRUDController {
    create: (body: any) => Promise<any>
    find: (query?: string, id?: string) => Promise<any>
    update: (data: any, id?: string, query?: string) => Promise<any>
    delete: (query: string) => Promise<any>
}

export class DbHandler implements IDataSourceAdapter {
    CollectionName: string;
    crudController: ICRUDController;
    private logger: Logger;
    constructor(dbController: ICRUDController, _collectionName: string) {
        this.crudController = dbController as ICRUDController;
        this.CollectionName = _collectionName;
        this.logger = CustomLogger.init('Dbhandler for ' + this.CollectionName);
        this.logger.info("DBHandler is initialized")
    }
    async create(data: any) {
        this.logger.log('Creating new Database entry', data);
        try {
            const result = await this.crudController.create(data);
            this.logger.info('Successfully created database entry', result);
            return result
        } catch (error) {
            this.logger.fatal('Error while creating entry', data, error);
            throw error;
        }
    }
    async upsert(data: any, id: any) {

        this.logger.log('Creating or Updating Database entry', { data, id });
        try {

            let result = await this.read(data.id);
            if (result) {
                result = await this.update(data, result.id);
                this.logger.info('Successfully updated database entry', result);
            } else {
                result = await this.create(data);
                this.logger.info('Successfully creating database entry', result);
            }
            return result
        } catch (error) {
            this.logger.fatal('Error while upserting entry', data, error);
            throw error;
        }
    }
    async delete(id: string): Promise<any> {
        const result = await this.crudController.delete(id);
        return result;
    }
    async update(data: any, id: string) {
        this.logger.log('Updating new Database entry', { data, id });
        try {
            const result = await this.crudController.update(data, id);
            this.logger.info('Successfully updated database entry', result);
            return result
        } catch (error) {
            this.logger.fatal('Error while updating entry', data, error);
            throw error;
        }
    }
    async read(id?: string, query?: string) {
        this.logger.log('Getting Database entry', { id });
        try {
            const result = await this.crudController.find(id, query);
            this.logger.info('Successfully getting database entry', result);
            return result
        } catch (error) {
            this.logger.fatal('Error while getting entry', id, error);
            throw error;
        }
        // const result = await this.dynamoDB.getItem({ TableName: this.collectionName, Key: }, null).promise()
    }
}
