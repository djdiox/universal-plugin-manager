import {DynamoDB} from 'aws-sdk'

export class DbHandler {
    private dynamoDB: DynamoDB;
    private collectionName: string;
    constructor(_dynamoDB: DynamoDB, _collectionName: string){
        this.dynamoDB = _dynamoDB;
        this.collectionName = _collectionName;
    }
    async insert(Id: string, data: any) {

    }
    async upsert(data: any) {

    }
    async delete(Id: string) {

    }
    async update(data: any, Id: string) {

    }
    async getById(Id: string) {
        // const result = await this.dynamoDB.getItem({ TableName: this.collectionName, Key: }, null).promise()
    }
    async get(query?: string) {

    }
}

const controller = {}
module.exports = {
    init(dbHandler : DbHandler) {

    }
}