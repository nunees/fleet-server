import { PrismaService } from '../helpers/prisma-service'

export const seedAccountType = async () => {
  try {
    console.info('Seeding AccountType...\n')
    await PrismaService.getInstance().userRoles.deleteMany()
    await PrismaService.getInstance().userRoles.createMany({
      data: [
        { id: 1, name: 'administrator' },
        { id: 2, name: 'teammate' },
      ],
    })
  } catch (error) {
    throw new Error(String(error))
  }
}
