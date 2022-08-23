import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";
import { WorkingPlace } from "src/working-places/entities/working-place.entity";

interface UserPlacesCreationAttribute{
    userId:number
    roleId:number
}

@Table({tableName:'user_places', createdAt:false, updatedAt:false})

export class UserPlaces extends Model<UserPlaces, UserPlacesCreationAttribute> {
    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
    id:number

    @ForeignKey(()=> User)
    @Column({type:DataType.NUMBER, allowNull:false})
    userId:number

    @ForeignKey(()=> WorkingPlace)
    @Column({type:DataType.NUMBER, allowNull:false,})
    placeId:number

}
