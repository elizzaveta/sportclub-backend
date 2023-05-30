import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models';
import { SubscriptionEntity } from '../../subscription/models';

@Entity('UsersSubscriptions')
export class UserSubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  user: UserEntity;

  @ManyToOne(
    () => SubscriptionEntity,
    (subscriptionEntity) => subscriptionEntity.id,
  )
  subscription: SubscriptionEntity;

  @Column({ default: null })
  startDate: Date;

  @Column({ default: null })
  endDate: Date;

  @Column({ default: true })
  isActive: boolean;
}
