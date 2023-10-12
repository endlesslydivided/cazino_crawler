import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';

import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {}

    async getOneCategory(params: {
        categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput;
        include?: Prisma.CategoryInclude;
    }): Promise<Category | null> {
        return this.categoryRepository.category(params);
    }

    async getManyCategories(params: {
        skip?: number;
        take?: number;
        where?: Prisma.CategoryWhereInput;
        orderBy?: Prisma.CategoryOrderByWithRelationInput;
    }): Promise<Category[]> {
        return this.categoryRepository.categories(params);
    }
}
