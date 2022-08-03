import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import {ConfigModule} from '@nestjs/config'


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:`.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [], 
        })
        ]
})

export class appModule { }