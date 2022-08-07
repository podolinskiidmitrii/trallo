import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import {ConfigModule} from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { User } from "./users/entities/user.entity";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/entities/role.entity";
import { UserRoles } from "./roles/entities/user-roles.entity";


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
            models: [User, Role, UserRoles], 
            autoLoadModels:true,
        }),
        UsersModule,
        RolesModule
    ]
})

export class appModule { }