import { DataTypes, Migration } from './umzugClient';

const tableName = 'users';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable(tableName, {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    sername: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    salt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    two_factor_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    two_factor_secret: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'banned', 'pending'),
      allowNull: false,
      defaultValue: 'active',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  await queryInterface.addIndex(tableName, ['email'], { unique: true });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable(tableName);
};
