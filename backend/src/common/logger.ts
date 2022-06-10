import fs from 'fs'
import log4js from 'log4js'
export class CustomLogger {
  // private logger: log4js.Logger;
  public static Loglevel = log4js.levels.ALL;
  private static logger: log4js.Logger;
  public static get Logger() { return this.logger; }
  
  constructor() {
    CustomLogger.Loglevel = Object.values(log4js.levels).reduce((acc: any, current = 10, index) => {
      
      acc[current] = log4js.levels.getLevel(current);
      return acc;
    }, {})
  }

  static init(currentContext: string): log4js.Logger {
    const json = JSON.parse(fs.readFileSync('../log4js.json', 'utf-8'));
    console.log('Init log4js', json)
    CustomLogger.logger = log4js.getLogger(currentContext);
    CustomLogger.logger.level = CustomLogger.Loglevel.getLevel('' + process.env.LOG_LEVEL)
    CustomLogger.logger.debug("Logger has been initialized with level: ", process.env.LOG_LEVEL);
    return CustomLogger.logger;
  }

   log(
     logLevel = log4js.levels.DEBUG, 
    message: string, ...args: any[]) {
     const desire = log4js.levels.DEBUG;
     switch (desire) {
       case value:
         
         break;
     
       default:
         break;
     }
  } 
}