import { AddAccount } from '@/domain/usecases/add-account'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  roleId: Number(faker.number.bigInt({ min: 1, max: 2 })),
  username: faker.internet.username(),
  email: faker.internet.email(),
  passwordHash: faker.internet.password(),
})

export const mockDuplicateAddAccountParams = (): AddAccount.Params => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  roleId: Number(faker.number.bigInt({ min: 1, max: 2 })),
  username: faker.internet.username(),
  email: faker.internet.email(),
  passwordHash: faker.internet.password(),
})
