import "reflect-metadata"
import { DataSource } from "typeorm"

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
require('dotenv').config({path: `../.env.${process.env.NODE_ENV}`});
console.log(process.env.NODE_ENV,'ho');
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    // username: 'jun',
    // password: 'tjdwns11',
    database: "postgres",
    synchronize: true, //dev only
    logging: false,
    entities: [
      "src/entities/**/*.ts"
    ],
    migrations: [],
    subscribers: [],
}
)
