import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto, throwsException } from '@/common';
import { NATS_SERVICE } from '@/config';
import { CreateProductDto, UpdateProductDto } from '@/products/dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client
      .send({ cmd: 'create_product' }, createProductDto)
      .pipe(throwsException());
  }

  @Get()
  findAllProducts(@Query() query: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client
      .send({ cmd: 'find_one_product' }, { id })
      .pipe(throwsException());
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client
      .send({ cmd: 'delete_product' }, { id })
      .pipe(throwsException());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe(throwsException());
  }
}
