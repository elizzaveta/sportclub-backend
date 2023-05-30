import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '../../user/models';
import { RolesEnum } from '../enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserEntity;

    if (user.roleId === RolesEnum.ADMIN && roles.includes(RolesEnum.ADMIN)) {
      return true;
    }

    return (
      user.id === parseInt(request.params.id) && roles.includes(RolesEnum.USER)
    );
  }
}
