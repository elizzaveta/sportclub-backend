import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { VisitEntity } from './models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/models';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VisitEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [VisitService, UserService],
  controllers: [VisitController],
})
export class VisitModule {}
