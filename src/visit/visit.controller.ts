import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { VisitService } from './visit.service';
import { from, Observable } from 'rxjs';
import { VisitEntity } from './models';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { RolesEnum } from '../auth/enum';

@UseGuards(JwtGuard)
@Controller('visits')
export class VisitController {
  constructor(private visitService: VisitService) {}

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN])
  @Post('/:id')
  addVisit(
    @Param('id') userId: number,
    @Body() visitDate: { date: string },
  ): Observable<VisitEntity> {
    return from(this.visitService.addVisit(userId, visitDate));
  }

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN])
  @Delete('/:id')
  deleteVisit(
    @Param('id') userId: number,
    @Body() visitDate: { date: string },
  ) {
    return this.visitService.deleteVisit(userId, visitDate);
    // userService.withdrawBonuses(one visit bonuses)
  }

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN, RolesEnum.USER])
  @Get('/:id')
  getUserVisits(@Param('id') id): Observable<VisitEntity[]> {
    return from(this.visitService.getUserVisits(id));
  }
}
