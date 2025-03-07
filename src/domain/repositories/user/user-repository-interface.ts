import { User } from '../../user/user';
import { BaseRepositoryInterface } from '../base/base-repository-interface';

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
  getByEmail(email: string): Promise<User | null>;
}
