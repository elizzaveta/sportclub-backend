import { UserEntity } from '../../user/models';
import { SubscriptionEntity } from '../../subscription/models';

export interface UserSubscriptionInterface {
  id: number;
  user: UserEntity;
  subscription: SubscriptionEntity;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}
