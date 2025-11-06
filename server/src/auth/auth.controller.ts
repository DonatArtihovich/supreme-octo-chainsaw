import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Request() req): Promise<Partial<User>> {
    const user: Partial<User> | null = await this.usersService.findById(req.user.id);
    if (!user) {
      throw new NotFoundException('Cannot found user with id.');
    }

    delete user.password;
    return user;
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@Request() req) {
    this.usersService.remove(req.user.id);
  }
}
