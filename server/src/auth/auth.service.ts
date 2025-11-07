import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException('Incorrect password');
        }

        const payload = {
            id: user.id,
            username: user.name,
        };

        return { access_token: await this.jwtService.signAsync(payload) };
    }

    async signUp({ name, email, password }: SignUpDto) {
        return this.usersService.create({ name, email, password });
    }
}
