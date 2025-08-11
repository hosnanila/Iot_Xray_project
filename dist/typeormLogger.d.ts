import { Logger } from 'typeorm';
export declare class TypeORMLogger implements Logger {
    log(level: 'log' | 'info' | 'warn' | 'error' | 'query' | 'schema' | 'migration', message: any): void;
    logQuery(query: string, parameters?: any[]): void;
    logQueryError(error: string, query: string, parameters?: any[]): void;
    logQuerySlow(time: number, query: string, parameters?: any[]): void;
    logSchemaBuild(message: string): void;
    logMigration(message: string): void;
}
