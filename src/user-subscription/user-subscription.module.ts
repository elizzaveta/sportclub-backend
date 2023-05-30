import { Module } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { UserSubscriptionController } from './user-subscription.controller';
import { UserSubscriptionEntity } from './models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/models';
import { SubscriptionEntity } from '../subscription/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSubscriptionEntity]),
    TypeOrmModule.forFeature([SubscriptionEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserSubscriptionService],
  controllers: [UserSubscriptionController],
})
export class UserSubscriptionModule {}
