import { UserEntity } from '../../user/models';
import { GiftEntity } from '../../gift/models';

export interface UserGiftsInterface {
  id: number;
  user: UserEntity;
  gift: GiftEntity;
  isUsed: boolean;
  usedDate: Date;
}
