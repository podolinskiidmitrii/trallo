import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/entities/role.entity";
import { UserRoles } from "src/roles/entities/user-roles.entity";
import { WorkingPlace } from "src/working-places/entities/working-place.entity";
import { UserPlaces } from "./user-places.entity";

interface UserCreationAttribute{
    email:string
    password:string
    username:string
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttribute>{

    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
    id:number

    @Column({type:DataType.STRING, allowNull:false, unique:true})
    username:string

    @Column({type:DataType.STRING, unique:false})
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

    @BelongsToMany(() => WorkingPlace, ()=> UserPlaces)
    places:WorkingPlace[]
}