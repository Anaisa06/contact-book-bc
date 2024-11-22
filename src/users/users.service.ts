import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if(!user) throw new NotFoundException(`User with id ${id} was not found`);
    return user;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({ where: {email}, select: {id: true, name: true, email: true, password: true, phoneNumber: true} });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { affected } = await this.usersRepository.update(id, updateUserDto);
    if(!affected) throw new NotFoundException('User was not found');
    return await this.findOne(id);
  }

}
