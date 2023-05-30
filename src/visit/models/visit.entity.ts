import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models';

@Entity('Visits')
export class VisitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  user: UserEntity;

  @Column({ default: new Date() })
  date: Date;

  @Column()
  accumulatedBonuses: number;
}
