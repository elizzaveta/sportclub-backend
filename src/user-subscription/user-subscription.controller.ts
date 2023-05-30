import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { from, Observable } from 'rxjs';
import { UserSubscriptionEntity } from './models';
import { RolesEnum } from '../auth/enum';

@UseGuards(JwtGuard)
@Controller('user-subscription')
export class UserSubscriptionController {
  constructor(private userSubscriptionService: UserSubscriptionService) {}

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN, RolesEnum.USER])
  @Post()
  addSubscriptionToUser(
    @Query('userId') userId: number,
    @Query('subscriptionId') subscriptionId: number,
  ) {
    console.log(userId + ' ' + subscriptionId);
    return this.userSubscriptionService.addSubscriptionToUser(
      userId,
      subscriptionId,
    );
  }

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN, RolesEnum.USER])
  @Get('/history/:id')
  getUserSubscriptionHistory(
    @Param('id') userId: number,
  ): Observable<UserSubscriptionEntity[]> {
    return from(
      this.userSubscriptionService.getUserSubscriptionHistory(userId),
    );
  }

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN, RolesEnum.USER])
  @Get('/active/:id')
  getUserActiveSubscription(
    @Param('id') userId: number,
  ): Observable<UserSubscriptionEntity> {
    return from(this.userSubscriptionService.getUserActiveSubscription(userId));
  }

  @UseGuards(RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN])
  @Delete('/:userSubscriptionId')
  deleteUserSubscription(
    @Param('userSubscriptionId') userSubscriptionId: number,
  ) {
    return this.userSubscriptionService.deleteUserSubscription(
      userSubscriptionId,
    );
  }
}
