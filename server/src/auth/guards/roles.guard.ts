import { CanActivate, ExecutionContext, Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Role } from "src/roles/entities/role.entity";
import { ROLES } from "../roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private jwtService:JwtService,
        private reflector:Reflector
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try{
            const requiredRoles = this.reflector.getAllAndOverride(ROLES, [
                context.getHandler(),
                context.getClass()
            ])

            if(!requiredRoles){
                return true
            }
            const req = context.switchToHttp().getRequest()

            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message:'Пользователь не авторизован!'})
            }

            const user = this.jwtService.verify(token)
            req.user = user
            return user.roles.some((role:Role) => requiredRoles.includes(role.name))
        }catch(e){
            throw new UnauthorizedException({message:'Недостаточно прав доступа!'})
        }
        return 
    }
}