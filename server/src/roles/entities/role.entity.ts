import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";
import { UserRoles } from "./user-roles.entity";

interface RoleCreationAttribute{
    name:string
    description:string
}

@Table({tableName:'roles'})
export class Role extends Model<Role, RoleCreationAttribute> {
    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
    id:number

    @Column({type:DataType.STRING, allowNull:false, unique: true})
    name:string

    @Column({type:DataType.STRING})
    description:string

    @BelongsToMany(() => User, () => UserRoles)
    users:User[]
}
