import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";
import { Role } from "./role.entity";

interface UserRolesCreationAttribute{
    userId:number
    roleId:number
}

@Table({tableName:'user_roles', createdAt:false, updatedAt:false})

export class UserRoles extends Model<UserRoles, UserRolesCreationAttribute> {
    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
    id:number

    @ForeignKey(()=> User)
    @Column({type:DataType.NUMBER, allowNull:false})
    userId:number

    @ForeignKey(()=> Role)
    @Column({type:DataType.NUMBER, allowNull:false,})
    roleId:number

}
