import { UniqueEntityId } from '../../../domain/shared/unique-entity-id/unique-entity-id';
import { User } from '../../../domain/user/user';
import { UserAttributes } from '../../../infrastructure/database/models/user/user-model';
import { Mapper } from '../../../shared/types/mapper';

export class UserMapper extends Mapper<User, UserAttributes>() {
  static toPersistence(domain: User): UserAttributes {
    return {
      id: domain.id.toString(),
      username: domain.username,
      email: domain.email,
      passwordHash: domain.passwordHash,
      salt: domain.salt,
      twoFactorEnabled: domain.twoFactorEnabled,
      twoFactorSecret: domain.twoFactorSecret,
      status: domain.status,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toDomain(raw: UserAttributes): User {
    return User.create(
      {
        username: raw.username,
        email: raw.email,
        passwordHash: raw.passwordHash,
        salt: raw.salt,
        twoFactorEnabled: raw.twoFactorEnabled,
        twoFactorSecret: raw.twoFactorSecret,
        status: raw.status,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toDTO(t: User): UserAttributes {
    return {
      id: t.id.toString(),
      username: t.username,
      email: t.email,
      passwordHash: t.passwordHash,
      salt: t.salt,
      twoFactorEnabled: t.twoFactorEnabled,
      twoFactorSecret: t.twoFactorSecret,
      status: t.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    };
  }
}
