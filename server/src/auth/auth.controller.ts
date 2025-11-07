import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Request,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.signIn(signInDto.email, signInDto.password);
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      throw new BadRequestException('User with this email not exist.')
    }

    if (signInDto.cookieAllowed) {
      res.cookie('jwt', access_token, {
        httpOnly: true,
        expires: signInDto.remember
          ? new Date(new Date().getTime() + 30 * 60 * 1000)
          : undefined
      });

      return user;
    }

    return { ...user, access_token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) res: Response) {
    if (await this.usersService.findByEmail(signUpDto.email)) {
      throw new BadRequestException('User with this email already exist.');
    }

    const user = await this.authService.signUp(signUpDto);
    const { access_token } = await this.authService.signIn(user.email, user.password);

    if (signUpDto.cookieAllowed) {
      res.cookie('access_token', access_token, {
        httpOnly: true,
        expires: signUpDto.remember
          ? new Date(new Date().getTime() + 30 * 60 * 1000)
          : undefined
      });

      return user;
    }

    return { ...user, access_token };
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
