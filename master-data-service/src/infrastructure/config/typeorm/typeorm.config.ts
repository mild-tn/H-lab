import { Logger } from '@nestjs/common';
import { join } from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
const envFile = join(__dirname, '../../../../env/local.env');
dotenv.config({ path: envFile });

export const entityPath = [
  join(
    __dirname,
    '../../../../',
    'src',
    'infrastructure',
    'entities',
    '**',
    '*.entity.ts',
  ),
];
export const migrationPath = [
  join(__dirname, '../../../../', 'database', 'migrations', '**', '*.ts'),
];

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: entityPath,
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  migrationsRun: true,
  migrations: migrationPath,
});

Logger.log(`entity path: ${entityPath}`);
Logger.log(`migration path: ${migrationPath}`);
AppDataSource.initialize()
  .then(() => {
    Logger.log('Data Source has been initialized!');
  })
  .catch((err) => {
    Logger.error('Error during Data Source initialization', err);
  });
