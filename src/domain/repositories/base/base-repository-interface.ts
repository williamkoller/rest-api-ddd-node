import { UniqueEntityId } from '../../shared/unique-entity-id/unique-entity-id'

export interface BaseRepositoryInterface<T> {
  save(domain: T): Promise<void>;
  delete(domain: T): Promise<void>;
  exists(domain: T): Promise<boolean | null>;
  getById(id: UniqueEntityId): Promise<T | null>;
  getAll(): Promise<T[]>;
}