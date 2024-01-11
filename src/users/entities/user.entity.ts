import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity() // { name: 'UserEntity' }
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  currentHashedRefreshToken?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // @OneToOne(() => RefreshToken, { cascade: true })
  // @JoinColumn()
  // refreshToken: RefreshToken;
}
