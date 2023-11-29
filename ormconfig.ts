import { User } from 'src/users/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const ORMConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD, //Qwerty!2345
//   database: 'pettyjs',
//   entities: [User],
//   synchronize: true, // process.env.NODE_ENV !== 'production'
// };

// export default ORMConfig;

export default (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'pettyjs',
  entities: [User],
  synchronize: true, // process.env.NODE_ENV !== 'production'
});
