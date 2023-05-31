import { UserEntity } from '../../user/models';
import { GiftEntity } from '../../gift/models';

export interface UserGiftsInterface {
  user: UserEntity;
  gift: GiftEntity;
  isUsed: boolean;
  usedDate: Date;
}
