import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { UserEntity, UserInterface } from './models';
import { from, Observable } from 'rxjs';
import { RolesEnum } from '../auth/enum';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @SetMetadata('roles', [RolesEnum.ADMIN, RolesEnum.USER])
  @Get(':id')
  getUser(@Param('id') id: string) {
    return from(this.userService.getById(parseInt(id)));
  }

  @SetMetadata('roles', [RolesEnum.ADMIN, RolesEnum.USER])
  @Get('phone/:phone')
  getUserByPhoneNumber(@Param('phone') phone: string) {
    return from(this.userService.getByPhoneNumber(phone));
  }

  @SetMetadata('roles', [RolesEnum.ADMIN, RolesEnum.USER])
  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() user: UserInterface,
  ): Observable<UserEntity> {
    console.log(user);
    return from(this.userService.update(id, user));
  }

  @SetMetadata('roles', [RolesEnum.ADMIN])
  @Post('bonus-account/:id')
  addBonuses(@Param('id') userId: number, @Query('amount') amount: number) {
    return this.userService.addBonuses(userId, Number(amount));
  }
}
