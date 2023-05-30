import { UserGiftsEntity } from '../../user-gifts/models';

export interface GiftInterface {
  name: string;
  description: string;
  requiredAmountOfBonuses: number;
  isAvailable?: boolean;
  userBonus: UserGiftsEntity[];
}
