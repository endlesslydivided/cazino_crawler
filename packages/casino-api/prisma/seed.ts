import { PrismaClient } from '@prisma/client'
import * as fs from 'fs';
import * as path from 'path';

const seedFilePath = process.env.SEED_PATH;

interface SeedItem
{
    categoryName: string,
    slug: string,
    games:{
        iconURL:string,
        name:string
    }[]
}

const prisma = new PrismaClient()

async function main() {

    const seed:SeedItem[] = JSON.parse(fs.readFileSync(path.resolve(seedFilePath)) as unknown as string);
    seed.forEach(async (item) => {
        const gameCreate = item.games.map((game) => ({
            iconUrl: game.iconURL,
            name: game.name
        }))

        await prisma.category.upsert({
            where:{name:item.categoryName},
            update:{},
            create: {
              slug: item.slug,
              name: item.categoryName,
              games: {
                create: gameCreate
              },
            },
        })
    })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })