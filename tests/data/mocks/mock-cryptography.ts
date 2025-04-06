import { Hasher } from '@/data/protocols/cryptography/hasher'
import { faker } from '@faker-js/faker'

export class HasherSpy implements Hasher {
  plaintext: string
  digest = faker.string.uuid()

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}
