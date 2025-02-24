import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dtos/create.clients.dto';
import { Client } from './clients.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientsRepository.find({ relations: ['todos'] });
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const user = this.clientsRepository.create(createClientDto);
    return this.clientsRepository.save(user);
  }

  async findOne(id: number): Promise<Client> {
    const data = await this.clientsRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException('client not found');
    }
    return data;
  }

  async remove(id: number): Promise<void> {
    const user = await this.clientsRepository.findOne({
      where: { id },
      relations: ['todos'],
    });
    if (user) {
      await this.clientsRepository.remove(user);
    }
  }
}
