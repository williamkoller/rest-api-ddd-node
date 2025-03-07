import { User } from './user';
import { UniqueEntityId } from '../shared/unique-entity-id/unique-entity-id';
import { DomainValidationException } from '../shared/errors/domain-validation-exception';
import { UserCreatedEvent } from './events/user-created-event';
import { UserStatusEnum } from '../enums/user-status-enum';

describe(User.name, () => {
  it('should create a new user with default values and trigger UserCreatedEvent', () => {
    const user = User.create({
      username: 'testuser',
      email: 'test@example.com',
      passwordHash: 'hashed_password',
      twoFactorEnabled: false,
      salt: 'random_salt',
      status: UserStatusEnum.ACTIVE,
    });

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
    expect(user.passwordHash).toBe('hashed_password');
    expect(user.salt).toBe('random_salt');
    expect(user.twoFactorEnabled).toBe(false);
    expect(user.status).toBe(UserStatusEnum.ACTIVE);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);

    const domainEvents = user.domainEvents;
    expect(domainEvents).toHaveLength(1);
    expect(domainEvents[0]).toBeInstanceOf(UserCreatedEvent);
  });

  it('should create a user without triggering UserCreatedEvent when an ID is provided', () => {
    const customId = new UniqueEntityId();
    const user = User.create(
      {
        username: 'customIDUser',
        email: 'custom@example.com',
        passwordHash: 'custom_hashed',
        salt: 'custom_salt',
        status: UserStatusEnum.ACTIVE,
      },
      customId,
    );

    expect(user.id).toEqual(customId);

    expect(user.domainEvents).toHaveLength(0);
  });

  it('should throw a DomainValidationException when required properties are missing', () => {
    expect(() =>
      User.create({
        username: '',
        email: '',
        passwordHash: '',
        salt: '',
        status: UserStatusEnum.ACTIVE,
      }),
    ).toThrow(DomainValidationException);
  });

  it('should update user status correctly', () => {
    const user = User.create({
      username: 'statusUser',
      email: 'status@example.com',
      passwordHash: 'status_hashed',
      salt: 'status_salt',
      status: UserStatusEnum.PENDING,
    });

    expect(user.status).toBe(UserStatusEnum.PENDING);

    user.updateStatus(UserStatusEnum.ACTIVE);

    expect(user.status).toBe(UserStatusEnum.ACTIVE);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should ensure twoFactorEnabled defaults to false if not provided', () => {
    const user = User.create({
      username: 'securityUser',
      email: 'security@example.com',
      passwordHash: 'security_hashed',
      salt: 'security_salt',
      status: UserStatusEnum.ACTIVE,
    });

    expect(user.props.twoFactorEnabled).toBe(false);
  });
});
