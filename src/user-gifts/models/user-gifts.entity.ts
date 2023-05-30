import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models';
import { GiftEntity } from '../../gift/models';

@Entity('UserGifts')
export class UserGiftsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  user: UserEntity;

  @ManyToOne(() => GiftEntity, (bonusEntity) => bonusEntity.id)
  gift: GiftEntity;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ default: null })
  usedDate: Date;
}
