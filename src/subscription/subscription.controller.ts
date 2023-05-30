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
import { SubscriptionService } from './subscription.service';
import { from, Observable } from 'rxjs';
import { SubscriptionEntity, SubscriptionInterface } from './models';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { RolesEnum } from '../auth/enum';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN])
  @Post()
  createMultiple(
    @Body() subscriptions: SubscriptionInterface[],
  ): Observable<SubscriptionInterface[]> {
    return from(this.subscriptionService.createMultiple(subscriptions));
  }

  @Get()
  getAll(): Observable<SubscriptionEntity[]> {
    return from(this.subscriptionService.getAll());
  }

  @Get('/:id')
  getById(@Param('id') id: number): Observable<SubscriptionEntity> {
    return from(this.subscriptionService.getById(id));
  }

  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', [RolesEnum.ADMIN])
  @Put('/:id')
  modify(
    @Param('id') id: number,
    @Body() subscription: SubscriptionInterface,
  ): Observable<SubscriptionEntity> {
    return from(this.subscriptionService.modify(id, subscription));
  }
}
