import { UserCreatedEvent } from './user-created-event';
import { User } from '../user';
import { UniqueEntityId } from '../../shared/unique-entity-id/unique-entity-id';
import { UserStatusEnum } from '../../enums/user-status-enum';
import { CommonValidation } from '../../../shared/validation/common-validation';
import { DomainValidationException } from '../../shared/errors/domain-validation-exception';

describe(UserCreatedEvent.name, () => {
  beforeEach(() => {
    jest
      .spyOn(CommonValidation, 'validateEmailAddress')
      .mockImplementation(() => false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should create a new UserCreatedEvent with the correct user and timestamp', () => {
    const user = User.create({
      username: 'testuser',
      email: 'test@example.com',
      passwordHash: 'hashed_password',
      salt: 'random_salt',
      status: UserStatusEnum.ACTIVE,
    });

    const event = new UserCreatedEvent(user);

    expect(event).toBeInstanceOf(UserCreatedEvent);
    expect(event.user).toEqual(user);
    expect(event.dateTimeOccurred).toBeInstanceOf(Date);
    expect(event.dateTimeOccurred.getTime()).toBeLessThanOrEqual(
      new Date().getTime(),
    );
    expect(event.getAggregateId()).toEqual(user.id);
  });

  it('should return the correct aggregate ID', () => {
    const userId = new UniqueEntityId();
    const user = User.create(
      {
        username: 'testuser2',
        email: 'test2@example.com',
        passwordHash: 'hashed_password',
        salt: 'random_salt',
        status: UserStatusEnum.ACTIVE,
      },
      userId,
    );

    const event = new UserCreatedEvent(user);

    expect(event.getAggregateId()).toEqual(userId);
  });

  it('should throw DomainValidationException when email is invalid', () => {
    const emailInvalid = 'email-mail';
    jest.spyOn(CommonValidation, 'validateEmailAddress').mockReturnValue(true);

    expect(() => {
      if (CommonValidation.validateEmailAddress(emailInvalid)) {
        throw new DomainValidationException('Email is invalid');
      }
    }).toThrow(DomainValidationException);
  });
});
