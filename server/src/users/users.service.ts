import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const user = {
      avatarUrl: null,
      ...createUserDto,
    }

    if (await this.findByEmail(user.email)) {
      throw new BadRequestException("User with this email already exists.");
    }

    await this.prismaService.user.create({ data: user });
    return user;
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.prismaService.user.delete({ where: { id } });
  }
}
