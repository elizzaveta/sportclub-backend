import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models';

@Entity('Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @OneToMany(() => UserEntity, (userEntity) => userEntity.role)
  users: UserEntity[];
}
