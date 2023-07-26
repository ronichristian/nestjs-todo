import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const config: TypeOrmModuleAsyncOptions = {
  imports: [],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: 'localhost',
      username: 'george',
      password: 'root',
      database: 'test_db',
      autoLoadEntities: true,
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: process.env.DD_LOGGING === 'true' ? true : false,
    };
  },
  inject: [],
};
