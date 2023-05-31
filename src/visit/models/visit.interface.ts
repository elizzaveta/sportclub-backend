import { UserEntity } from '../../user/models';

export interface VisitInterface {
  user: UserEntity;
  date: Date;
  accumulatedBonuses: number;
}
