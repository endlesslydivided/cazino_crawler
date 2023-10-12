import { Injectable } from '@nestjs/common';
import { Category, Game, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
    constructor(private prisma: PrismaService) {}

    async category(params: {
        categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput;
        include?: Prisma.CategoryInclude;
    }): Promise<Category | null> {
        const { categoryWhereUniqueInput, include } = params;

        return this.prisma.category.findUnique({
            where: categoryWhereUniqueInput,
            include: {
                _count: {
                    select: { games: true },
                },
                ...include,
            },
        });
    }

    async categories(params: {
        skip?: number;
        take?: number;
        where?: Prisma.CategoryWhereInput;
        orderBy?: Prisma.CategoryOrderByWithRelationInput;
    }): Promise<Category[]> {
        const { skip, take, where, orderBy } = params;
        return this.prisma.category.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                _count: {
                    select: { games: true },
                },
            },
        });
    }
}
