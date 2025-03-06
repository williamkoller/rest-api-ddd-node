import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';
import { Hash } from '../../interfaces/hash';
import { HashComparer } from '../../interfaces/hash-comparer';

jest.mock('bcrypt');

describe(BcryptAdapter.name, () => {
  const salt = 12;
  let bcryptAdapter: Hash & HashComparer;

  beforeEach(() => {
    bcryptAdapter = new BcryptAdapter();
  });

  describe('hash()', () => {
    it('should implement the Hash interface', () => {
      expect(typeof bcryptAdapter.hash).toBe('function');
    });

    it('should call bcrypt.hashSync with the correct values', async () => {
      const hashSpy = jest
        .spyOn(bcrypt, 'hashSync')
        .mockReturnValue('hashed_value');

      const result = await bcryptAdapter.hash('password', salt);

      expect(hashSpy).toHaveBeenCalledWith('password', salt);
      expect(result).toBe('hashed_value');
    });
  });

  describe('compare()', () => {
    it('should implement the HashComparer interface', () => {
      expect(typeof bcryptAdapter.compare).toBe('function');
    });

    it('should call bcrypt.compareSync with the correct values', async () => {
      const compareSpy = jest
        .spyOn(bcrypt, 'compareSync')
        .mockReturnValue(true);

      const result = await bcryptAdapter.compare('password', 'hashed_value');

      expect(compareSpy).toHaveBeenCalledWith('password', 'hashed_value');
      expect(result).toBe(true);
    });

    it('should return false when comparison fails', async () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      const result = await bcryptAdapter.compare('password', 'wrong_hash');

      expect(result).toBe(false);
    });
  });
});
