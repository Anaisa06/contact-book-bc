import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { NotFoundError } from 'rxjs';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>,
    private usersService: UsersService
    
  ){}

  async create(createContactDto: CreateContactDto) {
    const user = await this.usersService.findOne(createContactDto.userId);
    console.log('aqui es')
    const {latitude, longitude} = createContactDto.location;
    const newContact = this.contactsRepository.create({
      ...createContactDto,
      latitude,
      longitude,
      user
    })
    return await this.contactsRepository.save(newContact);
  }

  async findByUserId(id: number, query: PaginationQueryDto) {
    const user = await this.usersService.findOne(id);
    const {page, limit} = query;
    const [contacts, total] = await this.contactsRepository.findAndCount({
      where: {user},
      take: limit,
      skip: (page - 1) * limit,
      order: { name: 'ASC'}
      
    });
    if(!contacts.length) throw new NotFoundException(`No contacts were found for user with id ${id}`);
    return {
      contacts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const user = await this.contactsRepository.findOne({where: {id}});
    if(!user) throw new NotFoundException (`Contact with id ${id} was not found`);
    return user;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const {affected} = await this.contactsRepository.update(id, updateContactDto);
    if(!affected) throw new NotFoundException (`Contact with id ${id} was not found`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const {affected} = await this.contactsRepository.delete(id);
    if(!affected) throw new NotFoundException (`Contact with id ${id} was not found`);
  }
}
