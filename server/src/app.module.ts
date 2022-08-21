import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import {ConfigModule} from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';


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
            timezone:'+00:00',
            logging:process.env.IS_LOGGING ? console.log : false,
            autoLoadModels:true,
            synchronize:true,
        }),
        UsersModule,
        RolesModule,
        AuthModule
    ]
    
})

export class appModule { }