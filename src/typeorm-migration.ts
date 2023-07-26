import { DataSource } from 'typeorm';
import 'dotenv/config';

const configDB = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'george',
  password: 'root',
  database: 'test_db',
  synchronize: false,
  entities: ['dist/**/*.entity{.js}'],
  migrationsTableName: '_migration',
  migrations: [__dirname + '/_migrations/**/*{.ts,.js}'],
  logging: process.env.DD_LOGGING === 'true' ? true : false,
});

export default configDB;
