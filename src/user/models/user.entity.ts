import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../../role/models';
import { VisitEntity } from '../../visit/models';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: 0 })
  bonuses: number;

  @Column()
  birthday: Date;

  @Column()
  password: string;

  @ManyToOne(() => RoleEntity, (roleEntity) => roleEntity.id)
  role: RoleEntity;

  @Column({ default: 2 })
  roleId: number;

  @OneToMany(() => VisitEntity, (visitEntity) => visitEntity.id)
  visits: VisitEntity[];
}
