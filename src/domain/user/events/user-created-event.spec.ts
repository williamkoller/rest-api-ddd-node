import { UserCreatedEvent } from './user-created-event';
import { User } from '../user';
import { UniqueEntityId } from '../../shared/unique-entity-id/unique-entity-id';
import { UserStatusEnum } from '../../enums/user-status-enum';

describe(UserCreatedEvent.name, () => {
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
});
