import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserSubscriptionEntity } from '../../user-subscription/models';

@Entity('Subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'integer' })
  duration: number;

  @Column({ type: 'time' })
  entry_time: Date;

  @Column({ type: 'time' })
  exit_time: Date;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(
    () => UserSubscriptionEntity,
    (userSubscriptionEntity) => userSubscriptionEntity.id,
  )
  userSubscription: UserSubscriptionEntity[];
}
