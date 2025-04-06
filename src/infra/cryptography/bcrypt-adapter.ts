import { HashComparer, Hasher } from '@/data/protocols/cryptography/hasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt)
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest)
  }
}
