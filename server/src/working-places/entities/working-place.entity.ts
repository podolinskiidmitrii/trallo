import { Column, DataType, Model, Table } from "sequelize-typescript";

interface WorkingPlaceCreationAttribute{
    id:number
    name:string
    description:string
    owner_id:number
}

@Table({tableName:'working_places'})
export class WorkingPlace extends Model<WorkingPlace, WorkingPlaceCreationAttribute>{

    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
    id:number

    @Column({type:DataType.STRING, allowNull:false})
    name:string

    @Column({type:DataType.STRING})
    description:string

    @Column({type:DataType.INTEGER})
    owner_id:number
    
}