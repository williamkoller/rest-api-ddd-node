import { Test, TestingModule } from '@nestjs/testing';
import { UserStatusEnum } from '../../../../domain/enums/user-status-enum';
import { User, UserProps } from '../../../../domain/user/user';
import { UserRepository } from './user-repository';
import { UserModel } from '../../models/user/user-model';
import { getModelToken } from '@nestjs/sequelize';
import { UserMapper } from '../../../../application/mappers/user/user-mapper';
import { UniqueEntityId } from '../../../../domain/shared/unique-entity-id/unique-entity-id';

describe(UserRepository.name, () => {
  const mockUserModel = {
    create: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  };
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
  let repository: UserRepository;
  let userModel: typeof UserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(UserModel),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    userModel = module.get<typeof UserModel>(getModelToken(UserModel));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(userModel).toBeDefined();
  });

  it('should save a User', async () => {
    const user = User.create(userProps, new UniqueEntityId(userId));
    const userPersistence = UserMapper.toPersistence(user);
    mockUserModel.create.mockResolvedValue(userPersistence);
    await repository.save(user);
    expect(mockUserModel.create).toHaveBeenCalledWith(userPersistence);
  });

  it('should delete a user', async () => {
    const user = User.create(userProps, new UniqueEntityId(userId));
    const userPersistence = UserMapper.toPersistence(user);
    mockUserModel.destroy.mockResolvedValue(new UniqueEntityId(userId));

    await repository.delete(user);
    expect(mockUserModel.destroy).toHaveBeenCalledWith({
      where: { id: userPersistence.id.toString() },
    });
  });

  it('should check if a user exists', async () => {
    const user = User.create(userProps, new UniqueEntityId(userId));
    const userPersistence = UserMapper.toPersistence(user);
    mockUserModel.findOne.mockResolvedValue(userPersistence);
    const exists = await repository.exists(user);
    expect(exists).toBe(true);
  });

  it('should return null if user does not exist', async () => {
    const user = User.create(userProps, new UniqueEntityId(userId));
    mockUserModel.findOne.mockResolvedValue(null);
    const exists = await repository.exists(user);
    expect(exists).toBe(false);
  });

  it('should get a user by ID', async () => {
    const userMock = {
      ...userProps,
      id: userId,
    };
    mockUserModel.findOne.mockResolvedValue(userMock);
    const user = User.create(userProps, new UniqueEntityId(userId));

    jest.spyOn(UserMapper, 'toDomain').mockReturnValue(user);
    const result = await repository.getById(new UniqueEntityId(userId));
    expect(result).toBeInstanceOf(User);
  });

  it('should return null get a user by ID', async () => {
    mockUserModel.findOne.mockResolvedValue(null);
    const user = User.create(userProps, new UniqueEntityId(userId));

    jest.spyOn(UserMapper, 'toDomain').mockReturnValue(user);
    const result = await repository.getById(new UniqueEntityId(userId));
    expect(result).toBe(null);
  });

  it('should get a user by email', async () => {
    const userMock = {
      ...userProps,
      id: userId,
    };
    mockUserModel.findOne.mockResolvedValue(userMock);
    const user = User.create(userProps, new UniqueEntityId(userId));

    jest.spyOn(UserMapper, 'toDomain').mockReturnValue(user);
    const result = await repository.getByEmail(user.email);
    expect(result).toBeInstanceOf(User);
  });

  it('should return null get a user by email', async () => {
    mockUserModel.findOne.mockResolvedValue(null);
    const user = User.create(userProps, new UniqueEntityId(userId));

    jest.spyOn(UserMapper, 'toDomain').mockReturnValue(user);
    const result = await repository.getByEmail(user.email);
    expect(result).toBe(null);
  });

  it('should get all users', async () => {
    const user = User.create(userProps, new UniqueEntityId(userId));
    const userPersistence = UserMapper.toPersistence(user);
    const userPersistenceList = [userPersistence];
    mockUserModel.findAll.mockResolvedValue(userPersistenceList);
    jest.spyOn(UserMapper, 'toDomain').mockImplementation((user) =>
      User.create({
        username: user.username,
        email: user.email,
        passwordHash: user.passwordHash,
        salt: user.salt,
        twoFactorEnabled: user.twoFactorEnabled,
        twoFactorSecret: user.twoFactorSecret,
        status: user.status,
      }),
    );
    const users = await repository.getAll();
    expect(users.length).toBe(1);
    expect(users[0]).toBeInstanceOf(User);
  });
});
