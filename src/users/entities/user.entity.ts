import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
