import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { GiftService } from './gift.service';
import { from, Observable } from 'rxjs';
import { GiftEntity, GiftInterface } from './models';
import { RolesEnum } from '../auth/enum';
import { JwtGuard, RolesGuard } from '../auth/guard';

@Controller('gifts')
export class GiftController {
  constructor(private giftService: GiftService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN])
  @Post()
  async createGift(@Body() gifts: GiftEntity[]): Promise<GiftEntity[]> {
    console.log(gifts);
    const newGifts = await Promise.all(
      gifts.map(async (gift) => {
        const newGift = new GiftEntity();
        Object.assign(newGift, {
          ...gift,
        });
        return newGift;
      }),
    );
    return this.giftService.create(newGifts);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN])
  @Put('/:giftId')
  async update(
    @Param('giftId') giftId: number,
    @Body() updateGift: GiftInterface[],
  ) {
    return from(this.giftService.update(giftId, updateGift));
  }

  @Get()
  getAll(): Observable<GiftEntity[]> {
    return from(this.giftService.getAll());
  }

  @Get('/:giftId')
  getById(@Param('giftId') giftId: number): Observable<GiftEntity> {
    return from(this.giftService.getById(giftId));
  }
}
