import "reflect-metadata";
import {DataSource} from "typeorm";

// TODO 도커 명령어로 환경변수 제어하기
process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development';
require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});
export const AppDataSource = new DataSource({
        type: "postgres",
        host: "postgres",
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: "postgres",
        synchronize: true, //dev only
        logging: ['query'],
        entities: [
            "src/entities/**/*.ts"
        ],
        migrations: [],
        subscribers: [],
    }
);

// https://roqkfwk.tistory.com/15 // postgres 기본 쿼리문