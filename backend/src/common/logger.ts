import log4js from 'log4js'
import fs from 'fs'
export class CustomLogger {
  // private logger: log4js.Logger;
  public static Loglevel = log4js.levels;

  public static Logger: log4js.Logger;


  // public static get Logger() { return this.logger; }
  constructor(className: string) {
    CustomLogger.Logger = new log4js.Logger(className);
    // logger = new log4js.Logger(className)
    CustomLogger.Loglevel = Object.values(log4js.levels).reduce((acc, current, index) => {
      acc[current] = log4js.levels.getLevel(current);
      return acc;
    }, {});
  }

  static init(currentContext: string): log4js.Logger {
    // if(typeof CustomLogger.logger !== 'undefined') {
    //   CustomLogger.logger.log('Logger is already initialized', currentContext)
    //   return CustomLogger.logger;
    // }
    const json = JSON.parse(fs.readFileSync('../log4js.json', 'utf-8'));
    console.log('Init log4js', json)
    CustomLogger.Logger = log4js.getLogger(currentContext);
    CustomLogger.Logger.level = CustomLogger.Loglevel.getLevel('' + process.env.LOG_LEVEL)
    CustomLogger.Logger.debug("Logger has been initialized with level: ", process.env.LOG_LEVEL);
    return CustomLogger.Logger;
  }

}