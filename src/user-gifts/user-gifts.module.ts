import { Module } from '@nestjs/common';
import { UserGiftsService } from './user-gifts.service';
import { UserGiftsController } from './user-gifts.controller';
import { UserGiftsEntity } from './models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/models';
import { GiftEntity } from '../gift/models';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGiftsEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([GiftEntity]),
  ],
  providers: [UserGiftsService, UserService],
  controllers: [UserGiftsController],
})
export class UserGiftsModule {}
