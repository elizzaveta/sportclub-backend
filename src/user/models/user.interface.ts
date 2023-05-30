import { RoleEntity } from '../../role/models';
import { VisitEntity } from '../../visit/models';

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: Date;
  bonuses?: number;
  password?: string;
  role?: RoleEntity;
  visits?: VisitEntity[];
}
