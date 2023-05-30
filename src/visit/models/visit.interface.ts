import { UserEntity } from '../../user/models';

export interface VisitInterface {
  id: number;
  user: UserEntity;
  date: Date;
  accumulatedBonuses: number;
}
