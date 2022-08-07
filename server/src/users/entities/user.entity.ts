import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/entities/role.entity";
import { UserRoles } from "src/roles/entities/user-roles.entity";

interface UserCreationAttribute{
    email:string
    password:string
    username:string
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttribute>{

    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
    id:number

    @Column({type:DataType.STRING, allowNull:false})
    username:string

    @Column({type:DataType.STRING, unique: true})
    fullname:string

    @Column({type:DataType.STRING, unique: true, allowNull:true})
    email:string

    @Column({type:DataType.STRING, allowNull:false})
    password:string

    @Column({type:DataType.BOOLEAN, defaultValue:true}) 
    active:boolean

    @Column({type:DataType.STRING})
    ip:string

    @BelongsToMany(() => Role, ()=> UserRoles)
    roles:Role[]
}