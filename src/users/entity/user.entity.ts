import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  RelationOptions,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Todo } from '../../todo/entity/todo.entity';
import { Role } from 'src/enums/role.enum';

const relationOptions: RelationOptions = {
  cascade: ['insert', 'update', 'remove'],
};

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column()
  role: string;

  roles: Role[];

  async validatePassword(password: string) {
    const hash = bcrypt.hashSync(password, this.salt);
    return hash === this.password;
  }

  @OneToMany(() => Todo, (data) => data.user, relationOptions)
  userTodos: Todo[];
}
