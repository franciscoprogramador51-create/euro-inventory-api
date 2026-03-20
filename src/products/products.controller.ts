import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo produto no inventário' })
  @ApiBody({ 
    schema: {
      type: 'object',
      required: ['name', 'sku', 'price', 'stock', 'category'],
      properties: {
        name: { type: 'string', example: 'Cerveja Artesanal de Munique' },
        sku: { type: 'string', example: 'MUN-BEER-2026' },
        price: { type: 'number', example: 4.50 },
        stock: { type: 'number', example: 100 },
        category: { type: 'string', example: 'Bebidas' }
      }
    }
  })
  async create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos (Auditoria)' })
  async findAll() {
    return this.productsService.findAll();
  }
}