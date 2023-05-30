import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common/decorators';
import { UserGiftsService } from './user-gifts.service';
import { from, Observable } from 'rxjs';
import { UserGiftsEntity } from './models';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { Delete, SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../auth/enum';

@UseGuards(JwtGuard)
@Controller('user-gifts')
export class UserGiftsController {
  constructor(private userGiftsService: UserGiftsService) {}

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.USER])
  @Post('/:id/:giftId')
  addBonusToUser(
    @Param('id') id: number,
    @Param('giftId') giftId: number,
  ): Observable<UserGiftsEntity> {
    return from(this.userGiftsService.addBonusToUser(id, giftId));
  }

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.USER, RolesEnum.ADMIN])
  @Get('/:id')
  getUserBonuses(
    @Param('id') userId: number,
    @Query('isUsed') isUsed?: boolean,
  ): Observable<UserGiftsEntity[]> {
    return from(this.userGiftsService.getUserGifts(userId, isUsed));
  }

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN])
  @Put('/:userGiftId')
  markBonusUsed(@Param('userGiftId') userGiftId: number) {
    return from(this.userGiftsService.markGiftUsed(userGiftId));
  }

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.USER])
  @Delete('/:id/:userGiftId')
  deleteUserGift(
    @Param('userGiftId') userGiftId: number,
    @Param('id') id: number,
  ) {
    return from(this.userGiftsService.deleteUserGift(id, userGiftId));
  }
}
