export interface Hash {
  hash(plaintext: string, salt: number): Promise<string>;
}
