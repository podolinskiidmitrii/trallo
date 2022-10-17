export class CreateUserDto {
    readonly email: string;
    readonly fullname: string;
    readonly username: string;
    readonly password: string;
}

export class LoginUserDto {
    readonly username: string;
    readonly password: string;
}
