import { SetMetadata } from "@nestjs/common"

export const ROLES = 'roles'
export const RequiredRoles = (...roles: Array<string>) => SetMetadata(ROLES, roles)