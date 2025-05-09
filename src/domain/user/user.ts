import { Guard, IGuardArgument } from '../../shared/guards/guard';
import { CommonValidation } from '../../shared/validation/common-validation';
import { UserStatusEnum } from '../enums/user-status-enum';
import { AggregateRoot } from '../shared/aggregate-root/aggregate-root';
import { DomainValidationException } from '../shared/errors/domain-validation-exception';
import { UniqueEntityId } from '../shared/unique-entity-id/unique-entity-id';
import { UserCreatedEvent } from './events/user-created-event';

export type UserProps = {
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  status: UserStatusEnum;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get username(): string {
    return this.props.username;
  }

  get email(): string {
    return this.props.email;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  get salt(): string {
    return this.props.salt;
  }

  get twoFactorEnabled(): boolean {
    return this.props.twoFactorEnabled;
  }

  get twoFactorSecret(): string {
    return this.props.twoFactorSecret;
  }

  get status(): UserStatusEnum {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(
    props: Omit<UserProps, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UniqueEntityId,
  ): User {
    const guardArgs: IGuardArgument[] = [
      { argument: props.username, argumentName: 'username' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.passwordHash, argumentName: 'passwordHash' },
      { argument: props.salt, argumentName: 'salt' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (guardResult.isFailure)
      throw new DomainValidationException(guardResult.getErrorValue());

    if (CommonValidation.validateEmailAddress(props.email))
      throw new DomainValidationException('Email is invalid');

    const user = new User(
      {
        ...props,
        twoFactorEnabled: props.twoFactorEnabled ?? false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    const newUser = !!id === false;

    if (newUser) user.addDomainEvent(new UserCreatedEvent(user));

    return user;
  }

  public updateStatus(newStatus: UserStatusEnum): void {
    this.props.status = newStatus;
    this.props.updatedAt = new Date();
  }
}
