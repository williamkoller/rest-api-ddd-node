import { Optional } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

export type UserAttributes = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  twoFactorEnabled?: boolean | null;
  twoFactorSecret?: string | null;
  status: UserStatus;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
  PENDING = 'pending',
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({ tableName: 'users', timestamps: true, underscored: true })
export class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare username: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare email: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  declare passwordHash: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  declare salt: string;

  @Column(DataType.BOOLEAN)
  declare twoFactorEnabled: boolean;

  @Column(DataType.TEXT)
  declare twoFactorSecret: string;

  @AllowNull(false)
  @Column(
    DataType.ENUM(
      UserStatus.ACTIVE,
      UserStatus.INACTIVE,
      UserStatus.BANNED,
      UserStatus.PENDING,
    ),
  )
  declare status: UserStatus;

  @Column(DataType.DATE)
  declare createdAt: Date;

  @Column(DataType.DATE)
  declare updatedAt: Date;

  @Column(DataType.DATE)
  declare deletedAt: Date;
}
