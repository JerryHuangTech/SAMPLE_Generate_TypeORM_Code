
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entity/User';
import { Photo } from './entity/Photo';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User, Photo],
  migrations: [],
  subscribers: []
});
