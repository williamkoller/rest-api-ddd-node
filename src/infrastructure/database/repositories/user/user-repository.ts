import { InjectModel } from '@nestjs/sequelize';
import { UserRepositoryInterface } from '../../../../domain/repositories/user/user-repository-interface';
import { UserModel } from '../../models/user/user-model';
import { User } from '../../../../domain/user/user';
import { UserMapper } from '../../../../application/mappers/user/user-mapper';
import { UniqueEntityId } from '../../../../domain/shared/unique-entity-id/unique-entity-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  public async save(domain: User): Promise<void> {
    const userPersistence = UserMapper.toPersistence(domain);
    await this.userModel.create(userPersistence);
  }

  public async delete(domain: User): Promise<void> {
    const userPersistence = UserMapper.toPersistence(domain);
    await this.userModel.destroy({
      where: {
        id: userPersistence.id.toString(),
      },
    });
  }

  public async exists(domain: User): Promise<boolean | null> {
    const userPersistence = UserMapper.toPersistence(domain);
    const user = await this.userModel.findOne({
      where: {
        id: userPersistence.id.toString(),
      },
    });
    return !!user;
  }

  public async getById(id: UniqueEntityId): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: {
        id: id.toString(),
      },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  public async getAll(): Promise<User[]> {
    const users = await this.userModel.findAll();
    return users.map((user) => UserMapper.toDomain(user));
  }
}
