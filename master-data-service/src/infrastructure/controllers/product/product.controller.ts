import { GetProductUseCases } from 'src/usecases/product/get-product.usecase';
import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Query,
  Headers,
} from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { CreateProductUseCases } from 'src/usecases/product/create-product.usecase';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecase-proxy.module';
import { CreateProductDto } from './product.dto';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_PRODUCT_USECASE)
    private readonly createProductUsecase: UseCaseProxy<CreateProductUseCases>,
    @Inject(UsecasesProxyModule.GET_PRODUCT_USECASE)
    private readonly getProductUsecase: UseCaseProxy<GetProductUseCases>,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUsecase.getInstance().execute(createProductDto);
  }

  @Get()
  findOne(@Query('id') id: number, @Headers('Accept-Language') lang: string) {
    console.log(lang);
    return this.getProductUsecase.getInstance().execute(id, lang);
  }
}
