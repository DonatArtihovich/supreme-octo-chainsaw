import { IsBoolean, IsEmail, IsString } from "class-validator";

export class SignInDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsBoolean()
    remember: boolean;

    @IsBoolean()
    cookieAllowed: boolean;
}