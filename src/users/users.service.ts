import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) { }

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if(!user) throw new NotFoundException(`User with id ${id} was not found`);
    return user;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({ where: {email}, select: {id: true, name: true, email: true, password: true, phoneNumber: true} });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
