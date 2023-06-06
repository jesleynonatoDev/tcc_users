import { User } from '@src/models/user';

export type FilterOptions = Record<string, unknown>;
export type WithId<T> = { id: string } & T;

export interface BaseRepository<T> {
    create(data: T): Promise<WithId<T>>;
    findOne(options: FilterOptions): Promise<WithId<T>> | undefined;
    find(options: FilterOptions): Promise<WithId<T>[]>;
    delete(): Promise<void>;
}

export interface UserRepository extends BaseRepository<User> {
    findOneById(id: string): Promise<WithId<User>> | undefined;
    findOneByEmail(id: string): Promise<WithId<User>> | undefined;
}