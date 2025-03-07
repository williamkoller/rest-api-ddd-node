import { UserStatusEnum } from '../../../domain/enums/user-status-enum';
import { UniqueEntityId } from '../../../domain/shared/unique-entity-id/unique-entity-id';
import { User, UserProps } from '../../../domain/user/user';
import { UserAttributes } from '../../../infrastructure/database/models/user/user-model';
import { UserMapper } from './user-mapper';

describe(UserMapper.name, () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2025-03-07T16:56:51.192Z'));
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  const userId = '123';
  const userProps: UserProps = {
    username: 'any_username',
    email: 'email@mail',
    passwordHash: 'any_passwordHash',
    salt: 'any_salt',
    twoFactorEnabled: false,
    twoFactorSecret: 'twoFactor',
    status: UserStatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('toPersistence', () => {
    it('should map to User domain entity to persistence format', () => {
      const user = User.create(userProps, new UniqueEntityId(userId));
      const result = UserMapper.toPersistence(user);
      expect(result).toEqual({
        id: userId,
        username: 'any_username',
        email: 'email@mail',
        passwordHash: 'any_passwordHash',
        salt: 'any_salt',
        twoFactorEnabled: false,
        twoFactorSecret: 'twoFactor',
        status: UserStatusEnum.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  });

  describe('toDomain', () => {
    it('should map a User domain entity to a DTO format', () => {
      const rawUser: UserAttributes = {
        id: userId,
        username: 'any_username',
        email: 'email@mail',
        passwordHash: 'any_passwordHash',
        salt: 'any_salt',
        twoFactorEnabled: false,
        twoFactorSecret: 'twoFactor',
        status: UserStatusEnum.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = UserMapper.toDomain(rawUser);
      expect(result).toBeInstanceOf(User);
      expect(result.id.toString()).toBe(userId);
      expect(result.username).toBe('any_username');
      expect(result.email).toBe('email@mail');
      expect(result.passwordHash).toBe('any_passwordHash');
      expect(result.salt).toBe('any_salt');
      expect(result.twoFactorEnabled).toBe(false);
      expect(result.twoFactorSecret).toBe('twoFactor');
      expect(result.status).toBe(UserStatusEnum.ACTIVE);
      expect(result.createdAt).toStrictEqual(new Date());
      expect(result.updatedAt).toStrictEqual(new Date());
    });
  });

  describe('toDTO', () => {
    it('should map a User domain entity to a DTO format', () => {
      const user = User.create(userProps, new UniqueEntityId(userId));
      const result = UserMapper.toDTO(user);
      expect(result).toEqual({
        id: userId,
        username: 'any_username',
        email: 'email@mail',
        passwordHash: 'any_passwordHash',
        salt: 'any_salt',
        twoFactorEnabled: false,
        twoFactorSecret: 'twoFactor',
        status: UserStatusEnum.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  });
});
