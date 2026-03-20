import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(data: any) {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find();
  }
}