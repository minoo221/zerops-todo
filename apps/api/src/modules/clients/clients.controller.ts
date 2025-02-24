import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateClientDto } from './dtos/create.clients.dto';
import { ClientsService } from './clients.service';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a client by id' })
  @ApiResponse({ status: 200, description: 'The client with the matching id.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client by id' })
  @ApiResponse({ status: 200, description: 'The number of deleted clients.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.remove(id);
  }
}
