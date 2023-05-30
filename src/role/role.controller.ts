import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity, RoleInterface } from './models';
import { from, Observable } from 'rxjs';
import { RolesEnum } from '../auth/enum';
import { JwtGuard, RolesGuard } from '../auth/guard';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN])
  @Post()
  create(@Body() roles: RoleInterface[]): Observable<RoleInterface[]> {
    return from(this.roleService.create(roles));
  }

  @Get()
  getAll(): Observable<RoleEntity[]> {
    return from(this.roleService.getAll());
  }

  @Get('/:id')
  getById(@Param('id') id: number): Observable<RoleInterface> {
    return from(this.roleService.getById(id));
  }
}
