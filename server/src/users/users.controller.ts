import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: Partial<User> | null = await this.usersService.findById(+id);
    if (!user) {
      throw new NotFoundException("User with id " + id + " not found.");
    }

    delete user.password;
    return user;
  }
}
