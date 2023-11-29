import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dogs.controller';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import ORMConfig from 'ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
      load: [ORMConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...ORMConfig() }),
    CatsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, DogsController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
