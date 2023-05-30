import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserGiftsEntity } from '../../user-gifts/models';

@Entity('Gifts')
export class GiftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  requiredAmountOfBonuses: number;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => UserGiftsEntity, (userBonusesEntity) => userBonusesEntity.id)
  usersBonus: UserGiftsEntity[];
}
