import { compareSync, hashSync } from 'bcrypt'
import { Hash } from '../../interfaces/hash'
import { HashComparer } from '../../interfaces/hash-comparer'

export class BcryptAdapter implements Hash, HashComparer {
  async hash(plaintext: string, salt: number): Promise<string> {
    return hashSync(plaintext, salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return compareSync(plaintext, digest);
  }
}