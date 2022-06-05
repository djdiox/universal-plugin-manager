
export interface BaseItem {
    id: string;
    name: string;
    path: string;
    description?: string;
    version?: string;
    tags?: [string];
    icon?: string;
    downloadUrl?: string
    category?: AppCategory;
    apiType: Api
}

export enum Api {
    CLI = 'cli',
    REST = 'rest',
    HTML = 'html',
    SOAP = 'xml',
    SQS = 'sqs',
    UNKNOWN = 'unknown'
}

export enum AppCategory {
    Launcher = 'launcher',
    Browser = 'browser',
    Search = 'search',
    Console = 'console',
    IDE = 'development',
    Tool = 'tool',
    Other = 'other'
}

export class App implements BaseItem {
    public id: string;
    public name: string;
    public path: string;
    public executable: string;
    public description: string;
    public icon?: string;
    public category: AppCategory;
    public apiType: Api;
    public tags?: [string];

    constructor(
        _id: string,
        _name: string,
        _path: string,
        _executable: string,
        _pluginFolder: string,
        _apiType: Api,
        _category: AppCategory = AppCategory.Tool,
        _description: string,
        _icon?: string,
        _tags?: [string]
    ) {
        this.id = _id;
        this.name = _name;
        this.path = _path;
        this.executable = _executable;
        this.apiType = _apiType;
        this.description = _description;
        this.icon = _icon;
        this.tags = _tags;
        this.category = _category;
    }
}
export class Plugin extends App {
    // public id: string;
    // public name: string;
    // public description?: string;
    // public category: AppCategory;
    constructor(_application: App) {
        super(
            _application.id,
            _application.name,
            _application.description,
            _application.apiType,
            _application.category,
            _application.apiType,
            _application.category,
            _application.description,
            _application.icon,
            _application.tags
        );
    }
    // super(
    //     _id: string,
    //     _name: string,
    //     _description: string,
    //     _category: AppCategory = AppCategory.Tool
    // ) {
    //     this.id = _id;
    //     this.name = _name;
    //     this.category = _category;
    // }

}

export class System {

    public name = 'Plugin';

    constructor(_name: string) {
        this.name = _name;
    }

}