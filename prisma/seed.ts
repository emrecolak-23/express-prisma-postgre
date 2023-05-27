import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'colakkemre@gmail.com',
      firstname: "Emre",
      lastName: "Çolak",
      social: {
        facebook: "colakkemre",
        instagram: "colakkemre"
      }
    }
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
